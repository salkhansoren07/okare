begin;
create table if not exists public.early_access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(btrim(email)) and length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  status text not null default 'pending' check (status in ('pending', 'added')),
  created_at timestamptz not null default now(),
  consent_version text not null default 'early-access-2026-10-08',
  added_to_play_at timestamptz
);
create table if not exists public.early_access_rate_limits (
  fingerprint text primary key,
  window_start timestamptz not null,
  attempts integer not null
);
alter table public.early_access_requests enable row level security;
alter table public.early_access_rate_limits enable row level security;
revoke all on public.early_access_requests, public.early_access_rate_limits from public, anon, authenticated;
grant all on public.early_access_requests, public.early_access_rate_limits to service_role;

create or replace function public.request_early_access(p_email text, p_fingerprint text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(btrim(p_email));
  v_attempts integer;
begin
  if v_email is null or length(v_email) > 254 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
     or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid signup';
  end if;
  -- Remove expired anti-abuse identifiers as requests arrive; no raw IP is saved.
  delete from public.early_access_rate_limits where window_start < now() - interval '1 hour';
  insert into public.early_access_rate_limits as limits (fingerprint, window_start, attempts)
  values (p_fingerprint, now(), 1)
  on conflict (fingerprint) do update set attempts = limits.attempts + 1
  returning attempts into v_attempts;
  if v_attempts > 10 then return 'rate_limited'; end if;
  insert into public.early_access_requests (email) values (v_email)
  on conflict (email) do nothing;
  return 'accepted';
end;
$$;
revoke all on function public.request_early_access(text, text) from public, anon, authenticated;
grant execute on function public.request_early_access(text, text) to service_role;
commit;
