import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../api/products.js'
import { addToCart } from '../api/cart.js'
import { useAuth } from '../context/AuthContext.jsx'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id)
      setProduct(data)
      setLoading(false)
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <p>Loading product...</p>
  }

  if (!product) {
    return <p>Product not found.</p>
  }

  const onAddToCart = async () => {
    await addToCart(product.id)
    setMessage('Added to cart!')
  }

  return (
    <div>
      <p><Link to="/products">Back to products</Link></p>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.stock}</p>

      {user ? (
        <button onClick={onAddToCart}>Add to cart</button>
      ) : (
        <p><Link to="/login">Log in</Link> to add this to your cart.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}

export default ProductDetails
