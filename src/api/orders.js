import { API_ENDPOINT } from './index.js'

export async function getOrders() {
  const response = await fetch(`${API_ENDPOINT}/orders`, {
    credentials: 'include'
  })
  return response.json()
}

export async function getOrder(id) {
  const response = await fetch(`${API_ENDPOINT}/orders/${id}`, {
    credentials: 'include'
  })
  return response.json()
}

export async function cancelOrder(id) {
  const response = await fetch(`${API_ENDPOINT}/orders/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'cancelled' })
  })
  return response.json()
}
