import { useRef, useState } from 'react'

const testingUrl = 'https://play.google.com/apps/testing/com.salkhansoren.quickbite'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const submitting = useRef(false)

  async function submit(event) {
    event.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setState('submitting')
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: form.get('consent') === 'on', website: form.get('website') }),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error(response.status === 429
        ? 'Too many requests. Please try again in an hour.'
        : 'We couldn’t save your request. Please try again or contact support@okare.in.')
      const result = await response.json()
      if (result.accepted !== true) throw new Error('We couldn’t confirm your signup. Please try again.')
      setState('success')
    } catch (failure) {
      setError(failure.name === 'TimeoutError' ? 'The request timed out. Please try again.' : failure.message)
      setState('error')
    } finally {
      submitting.current = false
    }
  }

  return <section className="early-access shell" id="early-access" aria-labelledby="early-access-title">
    <div className="early-copy">
      <p className="eyebrow">HELP SHAPE OKARE</p>
      <h2 id="early-access-title">A first taste of Okare.</h2>
      <p>Join our Android early-access test. Try the app and help us make ordering from local kitchens better.</p>
      <ol><li>Send us the email you use on Google Play.</li><li>Wait for our team to add your email to the tester list.</li><li>Open the testing link with that same Google account, join the test and download Okare.</li></ol>
    </div>
    <div className="early-panel">
      {state === 'success' ? <div role="status" aria-live="polite">
        <span className="early-badge">Request received</span>
        <h3>You’re on the request list.</h3>
        <p>Your request has been saved. Our team needs to add your email to Google Play before you can join. Submitting this form does not grant immediate access.</p>
      </div> : <form onSubmit={submit}>
        <h3>Request early access</h3>
        <label htmlFor="early-email">Your Google Play email</label>
        <input id="early-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="you@gmail.com" required value={email} onChange={event => setEmail(event.target.value)} disabled={state === 'submitting'} aria-describedby="early-email-help" />
        <p id="early-email-help" className="early-small">Use the Google account signed in to the Play Store on your Android phone.</p>
        <div className="early-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="early-consent"><input type="checkbox" name="consent" required disabled={state === 'submitting'} /><span>I agree that Okare may use my email to manage early-access testing and add it to the Google Play tester list. <a href="/privacy-policy/">Privacy policy</a></span></label>
        <button className="early-submit" type="submit" disabled={state === 'submitting'}>{state === 'submitting' ? 'Saving request…' : 'Request early access →'}</button>
        {error && <p className="early-error" role="alert">{error}</p>}
      </form>}
      <div className="early-download"><h3>Already added as a tester?</h3><p className="early-small">Once our team has added your email, use this link to join and download. If you see “not available”, check your Google account or contact support.</p><a className="early-play" href={testingUrl} target="_blank" rel="noopener noreferrer">Join the Google Play test ↗</a></div>
      <p className="early-small">Questions or want your signup removed? <a href="mailto:support@okare.in">Contact support</a>.</p>
    </div>
  </section>
}
