import { API_ENDPOINT } from './index.js'

export async function getProducts() {
  const response = await fetch(`${API_ENDPOINT}/products`)
  return response.json()
}
