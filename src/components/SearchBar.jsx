import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ onSearch, delay = 300 }) => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, delay)

    return () => clearTimeout(timer)
  }, [searchTerm, delay, onSearch])

  return (
    <div style={{
      position: 'relative',
      marginBottom: '20px'
    }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 16px',
          paddingLeft: '40px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.3s ease',
          ':focus': {
            borderColor: '#2563eb'
          }
        }}
      />
      <div style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af'
      }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  delay: PropTypes.number
}

export default SearchBar