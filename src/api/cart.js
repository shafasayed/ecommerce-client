import { API_ENDPOINT } from './index.js'

export async function getCart() {
  const response = await fetch(`${API_ENDPOINT}/cart`, {
    credentials: 'include'
  })

  if (response.status === 404) {
    return { items: [], total: '0' }
  }

  return response.json()
}

export async function addToCart(productId, quantity = 1) {
  let response = await fetch(`${API_ENDPOINT}/cart/items`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity })
  })

  if (response.status === 404) {
    // No cart yet — create one, then try adding the item again.
    await fetch(`${API_ENDPOINT}/cart`, {
      method: 'POST',
      credentials: 'include'
    })

    response = await fetch(`${API_ENDPOINT}/cart/items`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity })
    })
  }

  return response.json()
}

export async function updateCartItem(itemId, quantity) {
  const response = await fetch(`${API_ENDPOINT}/cart/items/${itemId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  })

  return response.json()
}

export async function removeCartItem(itemId) {
  const response = await fetch(`${API_ENDPOINT}/cart/items/${itemId}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  return response.json()
}
