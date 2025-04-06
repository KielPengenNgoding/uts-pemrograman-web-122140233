import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../services/api'
import Loading from '../components/Loading'
import { useCart } from '../context/CartContext'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/cart')
  }

  if (loading) return <Loading />
  if (error) return <div className="error">Error: {error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '30px'
    }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#2563eb',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '20px',
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        ← Back to Products
      </button>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '30px',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '1fr 1fr'
        }
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{
              maxHeight: '400px',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            {product.title}
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              {product.category}
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ color: '#f59e0b' }}>
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            margin: '16px 0'
          }}>
            {product.description}
          </p>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b'
          }}>
            ${product.price}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '20px 0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <span style={{
                width: '40px',
                textAlign: 'center'
              }}>
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              style={{
                flex: 1,
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '12px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
                ':hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage