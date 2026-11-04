# Okare landing page redesign

Existing React/Vite marketing site only. Backend, signup API, legal routes, analytics, IndexNow, Digital Asset Links and public information generation retained.

## Components
App.jsx holds Hero, Benefits, WhyOkare, AppPreview, Experience, HowItWorks, Restaurants, FAQs and FinalCTA. components/landing.jsx contains shared icons, responsive food image, section intro, accessible header and footer. Existing EarlyAccess remains connected to /api/early-access.

## Assets
Biryani photography is AI-generated editorial imagery, not a restaurant listing. JPEG sources are supplied at 640px and 1200px with responsive srcSet. Original brand logo preserved; a smaller transparent copy is used on the landing page. Manrope and DM Sans are locally hosted, licensed under OFL.

## Destinations
No public ordering web route or partner registration URL exists in the inspected configuration. Explore/Discover leads to the existing Android early-access section; restaurant partnership enquiries lead to the real /contact/ page. Google Play test eligibility still requires team approval. Do not advertise general public installation until that status is confirmed.

## Deployment
Build and inspect locally, then deploy through the existing Vercel workflow. This redesign does not change the current production deployment automatically.

## Files
Modified: src/App.jsx, src/App.css, src/index.css, index.html, tests/agent-brand.test.mjs.
Added: src/components/landing.jsx; src/assets/biryani-{640,1200}.jpg; src/assets/okare-brand.png; public/fonts/ (two variable fonts plus their OFL licenses); tests/landing-redesign.test.mjs; this document; docs/screenshots/landing-{desktop,mobile}.jpg.

## Validation
Production build and 17 Node tests passed. Existing API validation, database signup restrictions, HTML/Markdown negotiation, structured data, trust pages and Digital Asset Links tests retained. Browser checks covered 320, 375, 390, 430, 768, 1024, 1440 and 1920 CSS pixels without horizontal document overflow. Mobile menu open/close, Escape, closing after link selection, FAQ click and Enter behaviour verified. Browser console had no warnings or errors in the inspected session. Local imagery loads correctly; below-fold images use lazy loading.

Brand red is #E83445. Buttons use a slightly deeper #D52A3C to provide approximately 4.97:1 contrast with white labels; smaller accent copy uses #C82335. Typography uses local font-display:swap files and responsive imagery avoids third-party hotlinks. Page title, description, canonical, Open Graph, Organization schema and crawler files retained. Lighthouse scores have not been measured and are not claimed. Live signup requests were not submitted; existing mocked API and database tests cover signup behavior.

The inaccessible reference URL was not used as a verified visual source. Screenshots show the implemented local preview. No production deployment was performed.
