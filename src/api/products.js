import { API_ENDPOINT } from './index.js'

export async function getProducts() {
  const response = await fetch(`${API_ENDPOINT}/products`)
  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`${API_ENDPOINT}/products/${id}`)
  return response.json()
}
