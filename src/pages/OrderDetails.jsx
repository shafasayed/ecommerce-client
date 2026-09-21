import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder, cancelOrder } from '../api/orders.js'

function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadOrder()
  }, [id])

  async function loadOrder() {
    const data = await getOrder(id)
    setOrder(data)
    setLoading(false)
  }

  const onCancel = async () => {
    setError('')
    const data = await cancelOrder(id)

    if (data.error) {
      setError(data.error)
      return
    }

    loadOrder()
  }

  if (loading) {
    return <p>Loading order...</p>
  }

  if (!order || order.error) {
    return <p>Order not found.</p>
  }

  return (
    <div>
      <p><Link to="/orders">Back to orders</Link></p>
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.product_name} x{item.quantity} — ${item.unit_price} each
          </li>
        ))}
      </ul>
      <p>Total: ${order.total}</p>

      {order.status === 'pending' && (
        <button onClick={onCancel}>Cancel order</button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default OrderDetails
