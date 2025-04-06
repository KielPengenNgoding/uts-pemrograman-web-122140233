// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      <Link 
        to={`/products/${product.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <div style={{
          height: '200px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.title}
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            marginBottom: '12px',
            height: '40px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {product.description}
          </p>
        </div>
      </Link>
      <div style={{
        padding: '0 16px 16px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontWeight: 'bold',
          fontSize: '1.125rem'
        }}>
          ${product.price}
        </span>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontWeight: '500',
            ':hover': {
              backgroundColor: '#1d4ed8'
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;