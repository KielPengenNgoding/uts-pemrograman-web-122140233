import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
      
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({
        type: 'SET_CART',
        payload: JSON.parse(savedCart)
      })
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])
  
  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: product
    })
  }
  
  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: productId
    })
  }
  
  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id: productId,
        quantity
      }
    })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}