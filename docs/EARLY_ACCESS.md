# Early-access signup

## Activate
1. Run `supabase/early-access.sql` in the existing Okare Supabase project's SQL Editor.
2. In the website's Vercel project, add server-only `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` environment variables. Never use `VITE_` for the key.
3. Deploy the website. Vercel serves `api/early-access.js` separately from Vite's static build.
4. Submit a controlled signup at `/#early-access`, then verify the row in
   Supabase → Table Editor → `early_access_requests`. Delete the test row afterwards.

`npm run dev` also serves the API through a Vite development middleware. Set the
same variables in a gitignored `.env.local` for local integration testing. Missing
configuration returns an honest failure rather than pretending the signup saved.
`npm run preview` previews static assets only; use Vercel for end-to-end production verification.

## Add testers
- Filter `early_access_requests` to `status = pending` and export the email column.
- Add those addresses in Play Console → Closed testing → Okare → Testers.
- Save/apply the Play Console changes. Only then set the rows to `status = added`
  and record `added_to_play_at` in Supabase.
- Notify testers manually after adding them. The website does not send email or
  automatically modify Google Play. Their join/download link is:
  https://play.google.com/apps/testing/com.salkhansoren.quickbite
- Each person must join with that same Google account. Internal testers must
  leave the internal test before joining the closed test.

## Privacy and access
Only the server's service role may invoke the signup function. Anonymous and
signed-in customers cannot read or modify the table. The form asks for consent,
normalises/deduplicates email, and returns the same success for repeat submissions.
A honeypot and an atomic database limit of 10 requests per network address per
hour provide basic abuse resistance; this is not a CAPTCHA or email ownership
verification. If abuse occurs, add Vercel Firewall rate limiting or a CAPTCHA.
The database stores an HMAC fingerprint, not a raw IP. Expired fingerprints are
removed on the next signup request; they can persist while the endpoint is idle.

Use emails only for the requested test, not unrelated marketing. Remove signup
records when testing ends or upon a verified removal request, and remove the
corresponding address from Play Console. This cleanup is a manual operator step.
