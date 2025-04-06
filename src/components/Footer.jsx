import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '1.5rem 0',
      marginTop: '2rem',
      textAlign: 'center',
      borderTop: '1px solid #334155'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <p style={{
          margin: '0.5rem 0',
          fontSize: '0.9rem',
          color: '#e2e8f0'
        }}>
          UTS Pemrograman Web - 122140233
        </p>
        <p style={{
          margin: '0.5rem 0',
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          &copy; {currentYear} SontangShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;