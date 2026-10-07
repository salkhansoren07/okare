# Public account-deletion request page

The static page lives at `public/delete-account/index.html`; Vite copies it to
`dist/delete-account/index.html`. It works without React, JavaScript, login or
an installed app. The optional copy button needs JavaScript; email instructions
and the email link do not.

## Release

1. Run `npm run build` and publish the complete `dist` directory using your existing website host.
2. Verify `https://okare.in/delete-account/` loads directly, including after refresh. Configure the host to serve directory index files (and redirect `/delete-account` to `/delete-account/` if needed), before any SPA fallback.
3. Verify support@okare.in receives mail. Test the email link on a phone and the manual email instructions on desktop. Opening the email link is not submission; the user must send the email.
4. Enter the verified live URL in Google Play Console's account-deletion URL field. The customer app now has Profile → App settings → Delete account; verify the deployed migration, scheduled worker, and released build before submission.

## Support operation and remaining policy decisions

Requests are handled manually through support@okare.in. No deletion endpoint,
automatic deletion, customer data collection form or email-sending service has
been added. Never delete an account solely because a sender knows its phone
number. Verify ownership through a trusted account verification process; do
not ask users to email passwords or login OTPs.

Record receipt, verification, applicable holds, completion and the response to
the customer. Inspect database relationships before deleting accounts: preserve
necessary restaurant/rider financial records. Clear related personal data and
storage as appropriate, not only the login record. Resolve requests with active
orders/refunds individually; do not silently discard them.

Before claiming Play readiness, the operator must confirm and publish:
- A realistic maximum processing timeframe.
- Enforcement of the chosen financial-retention target: 90 days after the latest related closure, with unresolved-case and required legal holds. Automatic financial cleanup is not yet enabled.
- Verified provider-log and backup retention periods where relevant.

The page currently explains these exceptions and directs users to support for
the applicable periods; it does not invent deadlines or claim everything is
deleted in 90 days. Replace that provisional wording once these operational
facts are confirmed. The existing 90-day cleanup is not account deletion.

Official requirements: https://support.google.com/googleplay/android-developer/answer/13327111

## Privacy page and cross-links

`public/privacy-policy/index.html` builds to `dist/privacy-policy/index.html` and is linked from the homepage and deletion page. It has no login, cookies, external fonts or JavaScript requirement. It describes both login methods, current providers, the 30-day in-app process, 90-day cleanup eligibility and retained financial records. Provider log/backup periods are explicitly unconfirmed; the financial-retention target is now 90 days after the latest related closure, but automated enforcement and applicable legal holds still require verification. No blanket Play compliance claim is made.

Verify both `/privacy-policy` and `/privacy-policy/` on the actual host, and both deletion URL variants. Serve static directory indexes before the SPA fallback. Publish the entire rebuilt `dist` directory. Publishing and live-domain verification are separate from local implementation; no hosting credentials or deployment configuration are provided here.
