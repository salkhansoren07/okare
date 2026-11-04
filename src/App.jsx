import { useEffect, useRef, useState } from 'react'
import { serviceArea } from '../shared/site-content.js'
import okareLogo from './assets/okare-brand.png'
import { FoodImage, Icon, SectionIntro, SiteHeader, SiteFooter } from './components/landing'
import EarlyAccess from './EarlyAccess'
import './App.css'

const benefits = [
  ['search', 'Find your favourites', 'Explore food around you'],
  ['bag', 'Order simply', 'Your meal, just a few taps away'],
  ['route', 'Follow along', 'Stay updated on your order'],
]
const reasons = [
  ['pin', 'Local tastes, closer', 'Explore nearby restaurants and discover the flavours that make your neighbourhood special.'],
  ['heart', 'Beautifully simple', 'Browse menus, pick what sounds good, and place an order without the extra fuss.'],
  ['route', "Know what’s next", "Keep an eye on your order’s progress from the moment you place it to the moment it arrives."],
]
const steps = [
  ["Explore what’s good", "Discover restaurants and find the food you’re craving."],
  ['Make it yours', 'Choose your favourites, review your order, and check out.'],
  ['Enjoy the moment', 'Follow your order and get ready for your meal.'],
]
const questions = [
  ['What is Okare?', 'Okare is a food ordering and delivery app operated by Okare Enterprise. We connect customers with local restaurants and kitchens. This website introduces Okare; food orders are placed in the customer app.'],
  ['Can I track my order?', 'Yes. The customer app shows your order’s progress. Live rider location and estimated arrival are available during supported active deliveries, when the rider is sharing location. Estimates may change.'],
  ['Where is Okare available?', `Okare serves ${serviceArea}. Availability depends on your exact address and the restaurants available at the time. Confirm your delivery address and pin in the app.`],
  ['How can restaurants join Okare?', 'Contact our team through the Contact page or email support@okare.in to discuss joining Okare. There is no public restaurant registration form on this website.'],
]

function Hero() {
  return <section className="hero shell" id="top" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="tiny-line" /> A LITTLE JOY, DELIVERED</p>
      <h1 id="hero-title"><span className="sr-only">Okare food delivery. </span>Good food.<br />Good mood.<br /><em>Right to you.</em></h1>
      <p className="hero-description">From everyday favourites to your next delicious discovery, Okare brings the food you love a little closer to home.</p>
      <div className="button-row"><a className="button primary" href="#early-access">Discover Okare <Icon name="arrow" /></a><a className="button secondary" href="#how">See how it works <Icon name="play" /></a></div>
      <p className="hero-footnote"><span className="small-heart"><Icon name="heart" /></span> Made for your cravings. Designed for ease.</p>
    </div>
    <div className="hero-art">
      <div className="food-orbit"><span className="orbit-label">LOCAL FLAVOURS. LITTLE MOMENTS OF JOY.</span><FoodImage priority className="hero-food" /><span className="spark spark-one" aria-hidden="true">✳</span><span className="spark spark-two" aria-hidden="true">✧</span></div>
      <div className="floating-note food-note"><span className="icon-tile"><Icon name="heart" /></span><div><strong>A little more delicious.</strong><small>A little closer to home.</small></div></div>
      <div className="floating-note local-note"><span className="status-dot" /><span>Rooted in Jharkhand</span><Icon name="pin" /></div>
    </div>
  </section>
}

function Benefits() {
  return <div className="benefits shell">{benefits.map(([icon, title, description]) => <div className="benefit" key={title}><Icon name={icon} /><div><h2>{title}</h2><p>{description}</p></div></div>)}</div>
}

function WhyOkare() {
  return <section className="section shell" id="why"><SectionIntro eyebrow="WHY OKARE" title="All the good things, in one happy place." description="Great meals deserve an effortless experience. We keep the little things simple so you can focus on the delicious part." /><div className="reason-grid">{reasons.map(([icon, title, text], index) => <article className="reason-card" key={title}><div className={`icon-tile tone-${index}`}><Icon name={icon} /></div><span className="card-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}

function AppPreview() {
  return <div className="phone-scene" aria-label="Illustrative preview of the Okare customer app, not live restaurant listings">
    <div className="phone-aura" />
    <div className="phone">
      <div className="phone-camera" aria-hidden="true" />
      <div className="phone-status" aria-hidden="true"><span>9:41</span><span>● ▰</span></div>
      <div className="phone-location"><span className="icon-tile"><Icon name="pin" /></span><div><small>DELIVERING TO</small><strong>Your little corner of home</strong></div><span className="phone-avatar">O</span></div>
      <div className="phone-search"><Icon name="search" /><span>What sounds good today?</span></div>
      <div className="phone-heading"><strong>Find your happy plate.</strong><span>Made for you</span></div>
      <div className="food-categories"><span className="chosen">All</span><span>Biryani</span><span>Snacks</span><span>Comfort food</span></div>
      <article className="phone-food-card"><FoodImage /><div className="phone-food-copy"><small>A TASTE OF HOME</small><strong>A little biryani happiness</strong><p>Discover local favourites in the app.</p></div></article>
      <div className="phone-order"><span className="icon-tile"><Icon name="bag" /></span><div><strong>Good things are on the way</strong><small>Follow every little step.</small></div><Icon name="arrow" /></div>
      <div className="phone-nav" aria-hidden="true"><span className="current"><Icon name="home" />Discover</span><span><Icon name="bag" />Orders</span><span><Icon name="person" />Profile</span></div>
    </div>
    <div className="floating-note phone-float"><span className="icon-tile"><Icon name="check" /></span><div><strong>Less fuss. More flavour.</strong><small>That’s the Okare way.</small></div></div>
    <p className="preview-label">ILLUSTRATIVE APP PREVIEW · NOT LIVE LISTINGS</p>
  </div>
}

function Experience() {
  return <section className="experience-band" id="experience"><div className="experience shell section"><div className="experience-copy"><p className="eyebrow">THE OKARE EXPERIENCE</p><h2>An easier way to get to the <em>good stuff.</em></h2><p>Clear choices, mouth-watering menus, and an experience made for those moments when you’re just really hungry.</p><ul className="feature-list">{['Browse nearby places to eat', 'Find dishes worth getting excited about', 'Follow your order with ease'].map(text => <li key={text}><span><Icon name="check" /></span>{text}</li>)}</ul><a className="text-link" href="#early-access">Meet your new food companion <Icon name="arrow" /></a><p className="availability-note">Android early access. Approval required.</p></div><AppPreview /></div></section>
}

function HowItWorks() {
  return <section className="section shell" id="how"><SectionIntro eyebrow="HOW IT WORKS" title="Craving. Tap. Enjoy." description="A few simple steps between you and something delicious." /><div className="steps">{steps.map(([title, text], index) => <article className="step" key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}

function Restaurants() {
  return <section className="partner-section shell" id="partners"><div className="partner-copy"><p className="eyebrow">FOR OUR LOCAL FOOD HEROES</p><h2>Great food deserves to be discovered.</h2><p>Okare is built around the joy of local food. If you run a restaurant and want to reach more food lovers, we’d love to be part of your story.</p><a className="button cream-button" href="/contact/">Talk to us about partnering <Icon name="arrow" /></a></div><div className="kitchen-art" aria-label="Illustration of a restaurant order ticket"><div className="kitchen-circle" /><div className="kitchen-plate"><FoodImage /></div><div className="kitchen-ticket"><Icon name="bag" /><span>FROM YOUR KITCHEN</span><strong>To someone’s<br />happy place.</strong><div className="ticket-rule" /><div className="ticket-bottom"><span>Prepared with care</span><Icon name="heart" /></div></div><span className="kitchen-caption">LOCAL KITCHENS. SHARED JOY.</span></div></section>
}

function FAQs() {
  const [opened, setOpened] = useState(null)
  return <section className="section faq-section shell" id="faq"><div><p className="eyebrow">A LITTLE MORE TO KNOW</p><h2>Good questions.<br />Simple answers.</h2><p>Need a hand? We’re here for you.</p><a className="text-link" href="/contact/">Get in touch <Icon name="arrow" /></a></div><div className="faq-list">{questions.map(([question, answer], index) => <div className={`faq-item${opened === index ? ' expanded' : ''}`} key={question}><h3><button type="button" id={`faq-question-${index}`} aria-expanded={opened === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpened(opened === index ? null : index)}>{question}<span aria-hidden="true">{opened === index ? '−' : '+'}</span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={opened !== index} inert={opened !== index ? true : undefined}><div><p>{answer}</p></div></div></div>)}</div></section>
}

function FinalCTA() {
  return <section className="final-cta shell"><span className="eyebrow">GOOD FOOD IS JUST THE BEGINNING</span><h2>Your next favourite meal<br /><em>is out there.</em></h2><p>Discover the joy of food, the Okare way.</p><div className="button-row"><a className="button primary" href="#early-access">Explore Okare <Icon name="arrow" /></a><a className="button secondary" href="#experience">Explore the experience</a></div><span className="cta-flower" aria-hidden="true">✳</span></section>
}

export default function App() {
  const root = useRef(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target) }
    }), { threshold: 0.08 })
    root.current.querySelectorAll('.reason-card, .step').forEach(element => { element.classList.add('reveal'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <div ref={root}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader logo={okareLogo} />
    <main id="main-content"><Hero /><Benefits /><WhyOkare /><Experience /><HowItWorks /><Restaurants /><FAQs /><FinalCTA /><EarlyAccess /></main>
    <SiteFooter logo={okareLogo} />
  </div>
}
