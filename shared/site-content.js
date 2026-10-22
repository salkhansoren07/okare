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
export const links = [['Home','https://okare.in/'],['Pricing and delivery charges','https://okare.in/pricing/'],['Privacy policy','https://okare.in/privacy-policy/'],['Delete account','https://okare.in/delete-account/'],['Sitemap','https://okare.in/sitemap.xml'],['Contact support','mailto:support@okare.in']]
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
export const sectionHtml = sections => sections.map(s=>`<section><h2>${escape(s.title)}</h2><p>${escape(s.text)}</p></section>`).join('\n')
export const markdown = (title, sections) => `# ${title}\n\n${sections.map(s=>`## ${s.title}\n\n${s.text}`).join('\n\n')}\n\n## Links\n\n${links.map(([label,url])=>`- [${label}](${url})`).join('\n')}\n`
export const homeMarkdown = markdown('Okare — local food delivery and Android early access', homeSections)
export const pricingMarkdown = markdown('Okare pricing and delivery charges', pricingSections)
export const missingMarkdown = '# Page not found\n\nThe requested page does not exist on Okare. Visit the [homepage](https://okare.in/), [sitemap](https://okare.in/sitemap.xml) or [site guide](https://okare.in/llms.txt) to find a public page.\n'
export const standaloneHtml = (title, body, path) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | Okare</title><meta name="description" content="${escape(title)} for Okare food ordering and delivery.">${path?`<link rel="canonical" href="https://okare.in${path}">`:'<meta name="robots" content="noindex">'}<style>body{font:17px/1.7 system-ui,sans-serif;color:#213c34;background:#fffdf9;margin:0}main{max-width:800px;margin:auto;padding:40px 24px}a{color:#174d3c}h1{line-height:1.2}section{margin:30px 0}nav{display:flex;gap:16px;flex-wrap:wrap}a:focus-visible{outline:3px solid #bb4d31}</style></head><body><main><a href="/">Okare home</a><h1>${escape(title)}</h1>${body}<nav aria-label="Useful links">${links.map(([label,url])=>`<a href="${url}">${label}</a>`).join(' ')}</nav></main></body></html>`
export const pricingHtml = standaloneHtml('Pricing and delivery charges',sectionHtml(pricingSections),'/pricing/')
export const missingHtml = standaloneHtml('Page not found','<p>The requested page does not exist. Use the links below to find information about Okare.</p>')
export const structuredData = {
 '@context':'https://schema.org', '@graph':[
  {'@type':'Organization','@id':'https://okare.in/#organization',name:'Okare Enterprise',url:'https://okare.in/',logo:'https://okare.in/favicon.png',description:homeSections[0].text,email:'support@okare.in',areaServed:serviceArea},
  {'@type':'SoftwareApplication','@id':'https://okare.in/#app',name:'Okare',url:'https://okare.in/',description:homeSections[0].text,operatingSystem:'Android',applicationCategory:'LifestyleApplication',identifier:'com.salkhansoren.quickbite',installUrl:'https://play.google.com/apps/testing/com.salkhansoren.quickbite',publisher:{'@id':'https://okare.in/#organization'}}
 ]
}
