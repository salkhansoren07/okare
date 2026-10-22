import { homeSections } from '../shared/site-content.js'
import { useState } from 'react'
import okareLogo from './assets/okare-logo.png'
import './App.css'
import EarlyAccess from './EarlyAccess'

const cuisines = [
  { icon: '🍔', name: 'Burgers', color: 'peach' },
  { icon: '🍜', name: 'Asian', color: 'lavender' },
  { icon: '🥗', name: 'Healthy', color: 'mint' },
  { icon: '🍕', name: 'Pizza', color: 'pink' },
  { icon: '🌮', name: 'Mexican', color: 'sun' },
]

const restaurants = [
  { name: 'JFC', type: 'Korean · Asian', emoji: '🍜', art: 'seoul', time: '20–30 min', rating: '4.9', tag: 'Top rated', promo: 'Free delivery' },
  { name: 'Kolkata Biryani', type: 'Burgers · American', emoji: '', art: 'burger', time: '15–25 min', rating: '4.8', tag: 'Popular', promo: '20% off' },
  { name: 'Pasta House', type: 'Italian · Pasta', emoji: '🍝', art: 'pasta', time: '25–35 min', rating: '4.7', tag: 'New', promo: 'Free delivery' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [cart, setCart] = useState(0)
  const [notice, setNotice] = useState('')
  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2400) }
  const addToCart = (restaurant) => { setCart((count) => count + 1); showNotice(`${restaurant.name} added to your preview bag. Place real orders in the app.`) }

  return <main>
    <nav className="nav shell" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); event.currentTarget.querySelector('.menu-toggle').focus() } }}>
      <a className="brand" href="#top" aria-label="Okare home"><img src={okareLogo} alt="Okare" width="2172" height="724" /></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="nav-links" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}><span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span></button>
      <div id="nav-links" className={`nav-links${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(false)}><a href="#restaurants">Restaurants</a><a href="#how">How it works</a><a href="#early-access">Early access</a></div>
      <div className="nav-actions"><button className="location" onClick={() => showNotice('Confirm your delivery address in the Okare app.')}>⌖ <span>Delivery to</span> Choose in the app</button><button className="cart" onClick={() => showNotice(cart ? `${cart} item${cart > 1 ? 's' : ''} in your bag` : 'Your bag is empty')}>Bag <b>{cart}</b></button></div>
    </nav>
    <section className="hero shell" id="top">
      <div className="hero-copy"><p className="eyebrow">GOOD FOOD, GOOD MOOD <i>✦</i></p><h1>Your favorite food,<br /><em>delivered with care.</em></h1><p className="hero-text">From the neighborhood spots you love to your next delicious discovery. Fresh, fast, and right to your door.</p><div className="address-search"><span>⌖</span><input aria-label="Delivery address" placeholder="Enter your delivery address" /><button onClick={() => showNotice('Open the Okare app to check restaurants for your address.')}>Find food <span>→</span></button></div><div className="hero-note"><span className="avatar a1">🧑🏽</span><span className="avatar a2">👩🏻</span><span className="avatar a3">👨🏾</span><b>Android early access</b></div></div>
      <div className="hero-visual" aria-label="A delicious pasta dish"><div className="leaf leaf-one">✦</div><div className="leaf leaf-two">❋</div><div className="food-shadow"></div><div className="plate"><div className="pasta">🍝</div><div className="basil">✦</div><div className="tomato t1"></div><div className="tomato t2"></div></div><div className="floating-card rating-card"><span className="round-icon">♥</span><div><b>Local kitchens</b><small>Explore in the app</small></div></div><div className="floating-card delivery-card"><span className="scooter">🛵</span><div><b>On its way!</b><small>Illustrative delivery preview</small></div></div></div>
    </section>
    <EarlyAccess />
    <section className="cuisine-section shell" id="offers"><div className="section-heading"><div><p className="eyebrow">EXPLORE BY TASTE</p><h2>What's on your mind?</h2></div><button className="arrow-button" aria-label="More cuisines">→</button></div><div className="cuisines"><button className={`cuisine all ${activeCuisine === 'All' ? 'selected' : ''}`} onClick={() => setActiveCuisine('All')}><span>✦</span>All</button>{cuisines.map((c) => <button key={c.name} className={`cuisine ${c.color} ${activeCuisine === c.name ? 'selected' : ''}`} onClick={() => setActiveCuisine(c.name)}><span>{c.icon}</span>{c.name}</button>)}</div></section>
    <section className="restaurant-section" id="restaurants"><div className="shell"><div className="section-heading"><div><p className="eyebrow">RESTAURANT PREVIEW</p><h2>Craving something delicious?</h2><p>Illustrative cards only. Check the app for actual menus, ratings, prices and delivery times.</p></div><a className="view-all" href="#restaurants">View all restaurants <span>→</span></a></div><div className="restaurant-grid">{restaurants.map((r) => <article className="restaurant-card" key={r.name}><div className={`restaurant-image ${r.art}`}><span className="deal">{r.promo}</span><span className="food-emoji">{r.emoji}</span><button className="heart" aria-label={`Save ${r.name}`}>♡</button></div><div className="restaurant-info"><div><h3>{r.name}</h3><p>{r.type}</p></div><span className="rating">★ {r.rating}</span></div><div className="restaurant-footer"><span>◷ {r.time}</span><span className="dot">•</span><span>{r.tag}</span><button onClick={() => addToCart(r)}>Add <b>+</b></button></div></article>)}</div></div></section>
    <section className="promise shell" id="how"><p className="eyebrow">THE OKARE PROMISE</p><h2>Every order, made better.</h2><div className="promise-grid"><div><span>⚡</span><h3>Lightning fast</h3><p>Hot food at your door, right when you want it.</p></div><div><span>♡</span><h3>Made with care</h3><p>We partner with the best local kitchens.</p></div><div><span>◎</span><h3>Track it live</h3><p>Follow your order from kitchen to doorstep.</p></div></div></section>
    <div className="site-info shell" id="about">{homeSections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<p><a href="/pricing/">Pricing and delivery charges</a></p></div>
    <footer className="site-footer shell"><span>Okare Enterprise</span><a href="/pricing/">Pricing</a><a href="/privacy-policy/">Privacy policy</a><a href="/delete-account/">Delete account</a><a href="mailto:support@okare.in">Contact support</a></footer>
    {notice && <div className="toast">{notice}</div>}
  </main>
}

export default App
