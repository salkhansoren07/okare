import { useEffect } from 'react'

export default function useLandingMotion(root) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return
    let observer
    const animations = new Set()
    const start = () => {
      if (media.matches) return
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const target = entry.target
          const siblings = [...target.parentElement.children].filter(item => item.matches('.reason-card, .step, .benefit'))
          const delay = Math.max(0, siblings.indexOf(target)) * 65
          const animation = target.animate([
            { opacity: 0.15, transform: 'translate3d(0, 18px, 0)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ], { duration: 650, delay, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' })
          animations.add(animation)
          animation.finished.then(() => animations.delete(animation)).catch(() => {})
          observer.unobserve(target)
        })
      }, { threshold: 0.1 })
      root.current?.querySelectorAll('.section-intro, .reason-card, .step, .benefit, .experience-copy, .phone-scene, .partner-copy, .kitchen-art, .faq-list, .final-cta, .early-panel').forEach(element => observer.observe(element))
    }
    const stop = () => { observer?.disconnect(); animations.forEach(animation => animation.cancel()); animations.clear() }
    const change = () => { stop(); start() }
    start()
    media.addEventListener('change', change)
    return () => { stop(); media.removeEventListener('change', change) }
  }, [root])
}
