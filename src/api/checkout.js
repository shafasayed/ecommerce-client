import { API_ENDPOINT } from './index.js'

export async function createCheckoutSession() {
  const response = await fetch(`${API_ENDPOINT}/cart/checkout/session`, {
    method: 'POST',
    credentials: 'include'
  })

  return response.json()
}

export async function confirmCheckout(sessionId) {
  const response = await fetch(`${API_ENDPOINT}/cart/checkout/confirm`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId })
  })

  const data = await response.json()
  return { ok: response.ok, data }
}
