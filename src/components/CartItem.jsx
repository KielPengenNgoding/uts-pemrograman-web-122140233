import PropTypes from 'prop-types'

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      padding: '16px 0',
      borderBottom: '1px solid #e5e7eb',
      alignItems: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        flexShrink: 0,
        backgroundColor: '#f9fafb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px'
      }}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '500',
          margin: 0
        }}>
          {item.title}
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          margin: 0
        }}>
          ${item.price.toFixed(2)}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            style={{
              width: '60px',
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={() => onRemove(item.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#dc2626',
              cursor: 'pointer',
              fontSize: '0.875rem',
              ':hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Remove
          </button>
        </div>
      </div>
      
      <div style={{
        fontWeight: 'bold',
        fontSize: '1.125rem'
      }}>
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired
}

export default CartItem