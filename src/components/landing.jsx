import { useEffect, useRef, useState } from 'react'
import { currentSection, readingProgress } from '../lib/navigation'
import foodLarge from '../assets/biryani-1200.jpg'
import foodSmall from '../assets/biryani-640.jpg'

const paths = {
  arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
  route: <><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  heart: <path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  home: <><path d="m3 10 9-7 9 7v11H3V10Z" /><path d="M9 21v-8h6v8" /></>,
  person: <><circle cx="12" cy="7" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></>,
}
export function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.heart}</svg>
}
export function FoodImage({ priority = false, className = '' }) {
  return <img src={foodLarge} srcSet={`${foodSmall} 640w, ${foodLarge} 1200w`} sizes={priority ? '(max-width: 700px) 90vw, (max-width: 1100px) 48vw, 580px' : '(max-width: 700px) 80vw, 360px'} width="1200" height="1200" alt="Paneer biryani with saffron basmati rice, golden paneer and fresh mint" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} />
}
export function SectionIntro({ eyebrow, title, description }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{description}</p></div>
}
const nav = [['Why Okare', '#why'], ['How it works', '#how'], ['The experience', '#experience'], ['For restaurants', '#partners']]
export function SiteHeader({ logo }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const header = useRef(null)
  const [activeSection, setActiveSection] = useState('')
  useEffect(() => {
    let frame = 0
    const sections = nav.map(([,href]) => document.querySelector(href)).filter(Boolean)
    const update = () => {
      frame = 0
      const node = header.current
      if (!node) return
      node.classList.toggle('is-scrolled', window.scrollY > 24)
      node.style.setProperty('--reading-progress', readingProgress(window.scrollY, document.documentElement.scrollHeight, window.innerHeight))
      setActiveSection(currentSection(sections.map(section => ({ id: '#' + section.id, top: section.getBoundingClientRect().top, bottom: section.getBoundingClientRect().bottom })), Math.min(window.innerHeight * .3, 180)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.documentElement)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])
  useEffect(() => {
    if (!open) return
    const closeOutside = event => { if (!header.current?.contains(event.target)) setOpen(false) }
    const desktop = window.matchMedia('(min-width: 821px)')
    const closeDesktop = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeDesktop)
    return () => { document.removeEventListener('pointerdown', closeOutside); desktop.removeEventListener('change', closeDesktop) }
  }, [open])
  useEffect(() => {
    if (!open) return
    const close = event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  return <header ref={header} className="site-header"><nav className="nav shell" aria-label="Main navigation"><a className="brand" href="#top" aria-label="Okare home" onClick={() => setOpen(false)}><img src={logo} alt="Okare" width="2172" height="724" /></a><div className="desktop-nav">{nav.map(([name, href]) => <a key={href} href={href} aria-current={activeSection === href ? 'location' : undefined}>{name}</a>)}</div><a className="button primary nav-cta" href="#early-access" onClick={() => setOpen(false)}>Explore Okare <Icon name="arrow" /></a><button type="button" className={`menu-toggle${open ? ' is-open' : ''}`} ref={toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}><span /><span /></button><div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" inert={!open ? true : undefined} aria-hidden={!open}><div>{nav.map(([name, href]) => <a key={href} href={href} aria-current={activeSection === href ? 'location' : undefined} onClick={() => setOpen(false)}>{name}<Icon name="arrow" /></a>)}<a href="#early-access" onClick={() => setOpen(false)}>Android early access <Icon name="arrow" /></a></div></div></nav></header>
}
export function SiteFooter({ logo }) {
  return <footer className="site-footer shell"><div className="footer-top"><div className="footer-brand"><a href="#top" aria-label="Okare home"><img src={logo} alt="Okare" width="2172" height="724" loading="lazy" /></a><p>Good food. Delivered with care.<br />From your neighbourhood, with love.</p></div><div className="footer-column"><h2>Discover</h2><a href="#why">Why Okare</a><a href="#experience">The experience</a><a href="/about/">About</a><a href="/pricing/">Pricing</a></div><div className="footer-column"><h2>Here to help</h2><a href="/contact/">Contact</a><a href="mailto:support@okare.in">Contact support</a><a href="/privacy/">Privacy</a><a href="/delete-account/">Delete account</a></div><div className="footer-column"><h2>Stay a little closer</h2><a href="https://www.instagram.com/okare.in?xtok=cHh2cm1qbHdjNGQy" target="_blank" rel="noopener noreferrer">Instagram <span className="sr-only">(opens in a new tab)</span> ↗</a><a href="https://x.com/Okare_in" target="_blank" rel="noopener noreferrer">X <span className="sr-only">(opens in a new tab)</span> ↗</a><a href="https://www.facebook.com/profile.php?id=61595729341731" target="_blank" rel="noopener noreferrer">Facebook <span className="sr-only">(opens in a new tab)</span> ↗</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Okare Enterprise. All rights reserved.</span><span>Made with care in Jharkhand <Icon name="heart" /></span></div></footer>
}
