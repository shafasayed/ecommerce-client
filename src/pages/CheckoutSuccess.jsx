import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { confirmCheckout } from '../api/checkout.js'

function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('checking')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  // React's development mode runs effects twice to help catch bugs.
  // Without this guard, the confirm request below would fire twice —
  // the second call would find the cart already cleared by the first.
  const hasConfirmed = useRef(false)

  useEffect(() => {
    if (hasConfirmed.current) {
      return
    }
    hasConfirmed.current = true

    async function confirm() {
      const sessionId = searchParams.get('session_id')

      if (!sessionId) {
        setStatus('error')
        setError('Missing session_id')
        return
      }

      const { ok, data } = await confirmCheckout(sessionId)

      if (!ok) {
        setStatus('error')
        setError(data.error)
        return
      }

      setOrder(data.order)
      setStatus('done')
    }

    confirm()
  }, [searchParams])

  if (status === 'checking') {
    return <p>Confirming your payment...</p>
  }

  if (status === 'error') {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <Link to="/cart">Back to cart</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Payment successful!</h1>
      <p>Order #{order.id} placed — total ${order.total}</p>
      <Link to="/orders">View my orders</Link>
    </div>
  )
}

export default CheckoutSuccess
