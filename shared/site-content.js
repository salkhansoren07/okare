export const serviceArea = 'Musabani, Jadugoda, Ghatshila, Karandih and Jamshedpur in East Singhbhum, Jharkhand'
export const homeSections = [
  { title: 'About Okare', text: 'Okare is a food-ordering and delivery app operated by Okare Enterprise. It connects customers with local restaurants and kitchens. This website introduces the service and lets Android users request access to the Google Play test; orders are placed in the customer app.' },
  { title: 'Where we deliver', text: `Okare serves ${serviceArea}. Restaurant availability and delivery eligibility depend on your exact address. Confirm your address and delivery pin in the app before placing an order.` },
  { title: 'How ordering works', text: 'Join the Android test after our team approves your Google Play email. In the app, choose available food, review your cart, select an address and confirm the delivery pin. Review the final total and the payment options offered at checkout before confirming your order.' },
  { title: 'Prices and delivery charges', text: 'Food prices depend on the restaurant and items selected. Delivery and any other applicable charges are shown in the app checkout before you confirm the order. There is no single fixed order price published on this website. Preview cards on this page are illustrations, not live menus, ratings or offers.' },
  { title: 'Android early access and support', text: 'Early access requires approval: submitting the signup form does not immediately add you to the Google Play tester list. The testing link uses com.salkhansoren.quickbite, the Android package identifier for the Okare customer app. If JavaScript is unavailable, email support@okare.in to request access or ask for help.' },
]
export const pricingSections = [
  { title: 'Food prices', text: 'Menu prices vary by restaurant and item. Check the current prices in the Okare app before adding items to your cart.' },
  { title: 'Delivery and other charges', text: 'The checkout shows delivery and any other applicable charges before you confirm your order. Charges can depend on your order and delivery address. This page does not advertise a fixed delivery fee or guarantee free delivery.' },
  { title: 'Review your final total', text: 'Review the item subtotal, applicable charges, any available discounts and the final payable amount in the app. Offers apply only when shown for your order; sample website cards are not an offer of sale.' },
  { title: 'Service locations', text: `Okare serves ${serviceArea}. Availability depends on the exact address and available restaurants. For pricing or delivery questions, contact support@okare.in.` },
]
export const links = [['Home','https://www.okare.in/'],['About','https://www.okare.in/about/'],['Contact','https://www.okare.in/contact/'],['Pricing and delivery charges','https://www.okare.in/pricing/'],['Privacy policy','https://www.okare.in/privacy-policy/'],['Delete account','https://www.okare.in/delete-account/'],['Sitemap','https://www.okare.in/sitemap.xml'],['Contact support','mailto:support@okare.in']]
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
export const sectionHtml = sections => sections.map(s=>`<section><h2>${escape(s.title)}</h2><p>${escape(s.text)}</p></section>`).join('\n')
export const markdown = (title, sections) => `# ${title}\n\n${sections.map(s=>`## ${s.title}\n\n${s.text}`).join('\n\n')}\n\n## Links\n\n${links.map(([label,url])=>`- [${label}](${url})`).join('\n')}\n`
export const homeMarkdown = markdown('Okare food delivery — Android early access', homeSections)
export const pricingMarkdown = markdown('Okare pricing and delivery charges', pricingSections)
export const missingMarkdown = '# Page not found\n\nThe requested page does not exist on Okare. Visit the [homepage](https://www.okare.in/), [sitemap](https://www.okare.in/sitemap.xml) or [site guide](https://www.okare.in/llms.txt) to find a public page.\n'
export const standaloneHtml = (title, body, path) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | Okare</title><meta name="description" content="${escape(title)} for Okare food ordering and delivery.">${path?`<link rel="canonical" href="https://www.okare.in${path}">`:'<meta name="robots" content="noindex">'}<style>body{font:17px/1.7 system-ui,sans-serif;color:#213c34;background:#fffdf9;margin:0}main{max-width:800px;margin:auto;padding:40px 24px}a{color:#174d3c}h1{line-height:1.2}section{margin:30px 0}nav{display:flex;gap:16px;flex-wrap:wrap}a:focus-visible{outline:3px solid #bb4d31}</style></head><body><main><a href="/">Okare home</a><h1>${escape(title)}</h1>${body}<nav aria-label="Useful links">${links.map(([label,url])=>`<a href="${url}">${label}</a>`).join(' ')}</nav></main></body></html>`
export const pricingHtml = standaloneHtml('Pricing and delivery charges',sectionHtml(pricingSections),'/pricing/')
export const missingHtml = standaloneHtml('Page not found','<p>The requested page does not exist. Use the links below to find information about Okare.</p>')
export const structuredData = {
 '@context':'https://schema.org', '@graph':[
  {'@type':'Organization','@id':'https://www.okare.in/#organization',name:'Okare Enterprise',url:'https://www.okare.in/',logo:'https://www.okare.in/favicon.png',description:homeSections[0].text,email:'support@okare.in',telephone:'+919942304436',areaServed:serviceArea,
   contactPoint: {
    '@type':'ContactPoint',
    contactType:'customer support',
    email:'support@okare.in',
    telephone:'+919942304436'
   },
   address: {
    '@type':'PostalAddress',
    streetAddress:'Musabani No-3',
    addressLocality:'Musabani, East Singhbhum',
    addressRegion:'Jharkhand',
    postalCode:'832104',
    addressCountry:'IN'
   }
  },
  {'@type':'SoftwareApplication','@id':'https://www.okare.in/#app',name:'Okare',url:'https://www.okare.in/',description:homeSections[0].text,operatingSystem:'Android',applicationCategory:'LifestyleApplication',identifier:'com.salkhansoren.quickbite',installUrl:'https://play.google.com/apps/testing/com.salkhansoren.quickbite',publisher:{'@id':'https://www.okare.in/#organization'}}
 ]
}

export const aboutSections = [
  { title: 'Who we are', text: 'Okare is a food-ordering and delivery service operated by Okare Enterprise, based at Musabani No-3, Musabani, East Singhbhum, Jharkhand 832104, India. Our customer app connects people with local restaurants and kitchens. This website explains the service and provides information about early access, pricing, privacy and support.' },
  { title: 'Our service locations', text: `We serve ${serviceArea}. Availability depends on your exact delivery address, the participating restaurants and their current availability. Confirm your address and delivery pin in the app before placing an order; a listed town does not mean every address can be served at all times.` },
  { title: 'Using the customer app', text: 'Customers choose available food, review their cart, confirm the delivery location and review the final price before placing an order in the app. Food prices and applicable delivery or other charges are shown at checkout. The restaurant cards on our landing page are previews, not a live menu or a guarantee of a particular offer.' },
  { title: 'Android early access', text: 'Okare is available through an Android early-access test. Request access using the email associated with your Google Play account, then wait for our team to add you to the tester list. The testing link uses com.salkhansoren.quickbite, the package identifier for the Okare customer app. For help getting started, contact support@okare.in.' },
]
export const contactSections = [
  { title: 'Contact Okare Enterprise', text: 'Email support@okare.in for questions about Okare, Android early access, delivery availability or an existing order. You can also call +91 9942304436. Our business address is Musabani No-3, Musabani, East Singhbhum, Jharkhand 832104, India. This is our published contact address; contact us before planning an in-person visit.' },
  { title: 'Order and payment questions', text: 'When asking about an order or payment, include the order or transaction reference and a short description of the problem. Explain whether you need help with delivery, a payment status or another order issue. Do not send your password, sign-in OTP, UPI PIN or card security code. Support may need to verify the relevant account before sharing account-specific information.' },
  { title: 'Android testing and service availability', text: `For early-access questions, tell us whether you have requested access and what message Google Play shows. Okare serves ${serviceArea}, subject to exact address and restaurant availability. Ask support if you are unsure whether your location can be served.` },
  { title: 'Privacy and account requests', text: 'You can use the same support email for access, correction and deletion questions about your personal information. Read our privacy policy and account-deletion page for the available request methods and verification process. Sending a support message does not automatically cancel an order, issue a refund or complete account deletion.' },
]
export const aboutHtml = standaloneHtml('About Okare', sectionHtml(aboutSections), '/about/')
export const contactHtml = standaloneHtml('Contact Okare', '<p><a href="mailto:support@okare.in">Email support@okare.in</a> · <a href="tel:+919942304436">Call +91 9942304436</a></p>' + sectionHtml(contactSections), '/contact/')

export const agentInstructions = `# Okare agent guidance

## When to use Okare

Use Okare when a customer wants to explore local food ordering in ${serviceArea}, request Android early access, understand checkout pricing, or contact the business about an existing order. Confirm exact-address eligibility in the customer app; service-area names do not guarantee availability at every address.

## How to access the service

Read https://www.okare.in/index.md for an overview, https://www.okare.in/about/ for the operator and service area, https://www.okare.in/pricing/ for the pricing explanation, and https://www.okare.in/contact/ for support. Public information can be read without signing in. The homepage also accepts GET with Accept: text/markdown.

To join the Android test, direct the user to https://www.okare.in/#early-access. The user supplies their Google Play email and agrees to the testing consent. Approval is required before using https://play.google.com/apps/testing/com.salkhansoren.quickbite . This package identifier belongs to the Okare customer app.

There is no documented public ordering API or agent payment endpoint. Do not call private app or signup endpoints as an ordering API. Direct the user to the customer app to choose available food, confirm their delivery address and pin, review charges and authorize payment themselves.

## Boundaries and authoritative information

Use current app checkout information for menus, prices, offers, availability and delivery charges. Website restaurant cards are illustrative. Do not promise delivery times, free delivery, refunds or successful payments from this landing page. For an existing order or payment issue, direct the customer to support@okare.in or +91 9942304436 with their order reference. Never request passwords, OTPs, UPI PINs or card security codes.

Read https://www.okare.in/privacy/ for the privacy policy and https://www.okare.in/delete-account/ for account-deletion instructions. These documents describe the service; they do not authorize an agent to submit personal information, place an order or perform account actions on the user's behalf.
`
// H1, summary blockquote, explanatory text, then H2-delimited file lists.
export const llmsText = `# Okare

> Okare is a food delivery app operated by Okare Enterprise for ${serviceArea}. Android early access requires approval; orders are placed in the customer app.

Canonical website: https://www.okare.in/ . Restaurant availability and final prices are confirmed in the app. The landing website has no public ordering API.

## When to use Okare

- [Agent guidance](https://www.okare.in/agent-instructions.md): Use Okare for local food-ordering discovery, Android test access, checkout-price explanations and order-support contacts. Read this file for access steps and limitations.
- [Service overview](https://www.okare.in/index.md): Check service locations and how customers order before recommending the app.

## Business and customer information

- [About Okare](https://www.okare.in/about/): Business operator, location, service areas and Android early access.
- [Contact](https://www.okare.in/contact/): Published support email, phone and business address.
- [Pricing](https://www.okare.in/pricing/): How to find food prices and delivery charges; no fixed fee is advertised.
- [Privacy](https://www.okare.in/privacy/): Full privacy policy, shared with the canonical /privacy-policy/ page.
- [Account deletion](https://www.okare.in/delete-account/): Request methods and account verification requirements.

## Optional

- [Sitemap](https://www.okare.in/sitemap.xml): Canonical public pages.
`
