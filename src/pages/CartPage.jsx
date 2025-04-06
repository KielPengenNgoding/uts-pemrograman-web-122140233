import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Notification from '../components/Notification';

const CartPage = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
        navigate('/'); // Redirect to home after checkout
      }, 3000);
    }, 1000);
  };

  if (totalItems === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '20px',
          color: '#e5e7eb'
        }}>
          🛒
        </div>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '16px',
          color: '#1e293b'
        }}>
          {showNotification ? 'Order Placed Successfully!' : 'Your Cart is Empty'}
        </h2>
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '30px',
          color: '#64748b',
          lineHeight: '1.6'
        }}>
          {showNotification 
            ? 'Thank you for your purchase! Your order is being processed.' 
            : 'Looks like you haven\'t added anything to your cart yet. Start shopping to find amazing products!'}
        </p>
        <Link 
          to="/products" 
          style={{
            display: 'inline-block',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#1d4ed8',
              transform: 'translateY(-2px)'
            }
          }}
        >
          {showNotification ? 'Continue Shopping' : 'Browse Products'}
        </Link>
        {showNotification && (
          <Notification 
            message="Order placed successfully!" 
            type="success" 
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {showNotification && (
        <Notification 
          message="Order placed successfully!" 
          type="success" 
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          color: '#1e293b'
        }}>
          Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h2>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#dc2626',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <span>Clear Cart</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '30px',
        '@media (min-width: 768px)': {
          gridTemplateColumns: '2fr 1fr'
        }
      }}>
        <div>
          {items.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
        
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          padding: '25px',
          height: 'fit-content',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1e293b',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '10px'
          }}>
            Order Summary
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{ color: '#64748b', fontSize: '1rem' }}>Subtotal</span>
            <span style={{ fontWeight: '500' }}>${totalPrice.toFixed(2)}</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{ color: '#64748b', fontSize: '1rem' }}>Shipping</span>
            <span style={{ color: '#16a34a', fontWeight: '500' }}>Free</span>
          </div>
          
          <div style={{
            borderTop: '1px solid #e2e8f0',
            margin: '20px 0'
          }}></div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '25px'
          }}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#16a34a',
              color: 'white',
              textAlign: 'center',
              padding: '14px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#15803d',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
              }
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;