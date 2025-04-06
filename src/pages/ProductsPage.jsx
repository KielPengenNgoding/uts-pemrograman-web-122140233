import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'
import { useCart } from '../context/CartContext'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  const handleSearch = (term) => {
    if (!term) {
      setFilteredProducts(products)
      return
    }
    
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  if (loading) return <Loading />
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div>
      <h1 style={{
        fontSize: '1.75rem',
        marginBottom: '20px',
        color: '#1e293b'
      }}>
        All Products
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage