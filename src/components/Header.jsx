import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { totalItems } = useCart()

  return (
    <header style={{
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '16px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          SontangShop
        </Link>
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px'
          }}>
            <li>
              <Link to="/products" style={{
                color: 'white',
                textDecoration: 'none'
              }}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Cart
                {totalItems > 0 && (
                  <span style={{
                    backgroundColor: 'white',
                    color: '#2563eb',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.75rem'
                  }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header