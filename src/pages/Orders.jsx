import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../api/orders.js'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      const data = await getOrders()
      setOrders(data)
      setLoading(false)
    }

    loadOrders()
  }, [])

  if (loading) {
    return <p>Loading orders...</p>
  }

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>
  }

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
            {' — '}{order.status}{' — $'}{order.total}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
