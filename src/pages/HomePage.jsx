import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#1e293b'
      }}>
        Welcome to SontangShop
      </h1>
      <p style={{
        fontSize: '1.125rem',
        marginBottom: '30px',
        color: '#475569',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Discover amazing products at the best prices
      </p>
      <Link 
        to="/products" 
        style={{
          display: 'inline-block',
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease',
          ':hover': {
            backgroundColor: '#1d4ed8'
          }
        }}
      >
        Browse Products
      </Link>
    </div>
  )
}

export default HomePage