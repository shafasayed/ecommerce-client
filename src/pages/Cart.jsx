import { useEffect, useState } from 'react'
import { getCart, updateCartItem, removeCartItem } from '../api/cart.js'

function Cart() {
  const [cart, setCart] = useState({ items: [], total: '0' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    const data = await getCart()
    setCart(data)
    setLoading(false)
  }

  const onQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return
    await updateCartItem(itemId, quantity)
    loadCart()
  }

  const onRemove = async (itemId) => {
    await removeCartItem(itemId)
    loadCart()
  }

  if (loading) {
    return <p>Loading cart...</p>
  }

  if (cart.items.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.unit_price} x{' '}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                onQuantityChange(item.id, Number(e.target.value))
              }
              style={{ width: '3em' }}
            />
            {' '}= ${item.subtotal}{' '}
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.total}</p>
    </div>
  )
}

export default Cart
