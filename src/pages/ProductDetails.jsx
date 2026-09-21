import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../api/products.js'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div>
      <p><Link to="/products">Back to products</Link></p>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.stock}</p>
    </div>
  )
}

export default ProductDetails
