import { useState } from 'react'
import './App.css'

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
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [cart, setCart] = useState(0)
  const [notice, setNotice] = useState('')
  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2400) }
  const addToCart = (restaurant) => { setCart((count) => count + 1); showNotice(`${restaurant.name} added to your order`) }

  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top" aria-label="Okare home"><span>o</span>kare</a>
      <div className="nav-links"><a href="#restaurants">Restaurants</a><a href="#how">How it works</a><a href="#offers">Offers</a></div>
      <div className="nav-actions"><button className="location" onClick={() => showNotice('Location selector coming right up!')}>⌖ <span>Delivery to</span> 48 Willow Street⌄</button><button className="cart" onClick={() => showNotice(cart ? `${cart} item${cart > 1 ? 's' : ''} in your bag` : 'Your bag is empty')}>Bag <b>{cart}</b></button></div>
    </nav>
    <section className="hero shell" id="top">
      <div className="hero-copy"><p className="eyebrow">GOOD FOOD, GOOD MOOD <i>✦</i></p><h1>Your favorite food,<br /><em>delivered with care.</em></h1><p className="hero-text">From the neighborhood spots you love to your next delicious discovery. Fresh, fast, and right to your door.</p><div className="address-search"><span>⌖</span><input aria-label="Delivery address" placeholder="Enter your delivery address" /><button onClick={() => showNotice('We’ll show nearby restaurants!')}>Find food <span>→</span></button></div><div className="hero-note"><span className="avatar a1">🧑🏽</span><span className="avatar a2">👩🏻</span><span className="avatar a3">👨🏾</span><b>Loved by 10k+ foodies</b><span>★★★★★</span></div></div>
      <div className="hero-visual" aria-label="A delicious pasta dish"><div className="leaf leaf-one">✦</div><div className="leaf leaf-two">❋</div><div className="food-shadow"></div><div className="plate"><div className="pasta">🍝</div><div className="basil">✦</div><div className="tomato t1"></div><div className="tomato t2"></div></div><div className="floating-card rating-card"><span className="round-icon">♥</span><div><b>4.9 out of 5</b><small>Foodies love us</small></div></div><div className="floating-card delivery-card"><span className="scooter">🛵</span><div><b>On its way!</b><small>Arrives in 18 min</small></div></div></div>
    </section>
    <section className="cuisine-section shell" id="offers"><div className="section-heading"><div><p className="eyebrow">EXPLORE BY TASTE</p><h2>What's on your mind?</h2></div><button className="arrow-button" aria-label="More cuisines">→</button></div><div className="cuisines"><button className={`cuisine all ${activeCuisine === 'All' ? 'selected' : ''}`} onClick={() => setActiveCuisine('All')}><span>✦</span>All</button>{cuisines.map((c) => <button key={c.name} className={`cuisine ${c.color} ${activeCuisine === c.name ? 'selected' : ''}`} onClick={() => setActiveCuisine(c.name)}><span>{c.icon}</span>{c.name}</button>)}</div></section>
    <section className="restaurant-section" id="restaurants"><div className="shell"><div className="section-heading"><div><p className="eyebrow">NEAR YOU NOW</p><h2>Craving something delicious?</h2></div><a className="view-all" href="#restaurants">View all restaurants <span>→</span></a></div><div className="restaurant-grid">{restaurants.map((r) => <article className="restaurant-card" key={r.name}><div className={`restaurant-image ${r.art}`}><span className="deal">{r.promo}</span><span className="food-emoji">{r.emoji}</span><button className="heart" aria-label={`Save ${r.name}`}>♡</button></div><div className="restaurant-info"><div><h3>{r.name}</h3><p>{r.type}</p></div><span className="rating">★ {r.rating}</span></div><div className="restaurant-footer"><span>◷ {r.time}</span><span className="dot">•</span><span>{r.tag}</span><button onClick={() => addToCart(r)}>Add <b>+</b></button></div></article>)}</div></div></section>
    <section className="promise shell" id="how"><p className="eyebrow">THE OKARE PROMISE</p><h2>Every order, made better.</h2><div className="promise-grid"><div><span>⚡</span><h3>Lightning fast</h3><p>Hot food at your door, right when you want it.</p></div><div><span>♡</span><h3>Made with care</h3><p>We partner with the best local kitchens.</p></div><div><span>◎</span><h3>Track it live</h3><p>Follow your order from kitchen to doorstep.</p></div></div></section>
    {notice && <div className="toast">{notice}</div>}
  </main>
}

export default App
