import React from 'react';
import { useVarukorg } from '../VarukorgContext';
import { Link } from 'react-router-dom';

function Varukorg() {
  const { varukorg, okaKvantitet, minskaKvantitet, taBortProdukt } = useVarukorg();

  const totalPris = varukorg.reduce((sum, item) => sum + item.pris * item.kvantitet, 0);
  const antalProdukter = varukorg.reduce((sum, item) => sum + item.kvantitet, 0);

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Din Varukorg</h1>
        {varukorg.length > 0 && (
          <p className="page-description">{antalProdukter} {antalProdukter === 1 ? 'produkt' : 'produkter'} i din varukorg</p>
        )}
      </div>
      
      {varukorg.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Din varukorg är tom</h2>
          <p>Upptäck vår utsökta meny och lägg till produkter i din varukorg.</p>
          <Link to="/meny" className="btn btn-primary">Bläddra i menyn</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {varukorg.map(item => (
              <div key={item.id} className="cart-item card">
                <div className="item-image">
                  <img src={item.bildUrl} alt={item.namn} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.namn}</h3>
                  <p className="item-category">{item.kategori}</p>
                  <p className="item-price">{item.pris} SEK</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => minskaKvantitet(item.id)}
                      disabled={item.kvantitet <= 1}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <span className="quantity">{item.kvantitet}</span>
                    <button className="quantity-btn" onClick={() => okaKvantitet(item.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="item-subtotal">
                    {item.pris * item.kvantitet} SEK
                  </div>
                  <button className="remove-btn" onClick={() => taBortProdukt(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary card">
            <h3 className="summary-title">Sammanfattning</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Delsumma</span>
                <span>{totalPris} SEK</span>
              </div>
              <div className="summary-row">
                <span>Leveransavgift</span>
                <span>0 SEK</span>
              </div>
            </div>
            <div className="summary-total">
              <span>Totalt</span>
              <span>{totalPris} SEK</span>
            </div>
            <Link to="/betalning" className="btn btn-primary checkout-btn">
              Gå till kassan
            </Link>
            <Link to="/meny" className="continue-shopping">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Fortsätt handla
            </Link>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .cart-page {
          padding-bottom: var(--space-xxl);
        }
        
        .page-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        
        .page-description {
          color: var(--gray-600);
        }
        
        .empty-cart {
          text-align: center;
          padding: var(--space-xxl) 0;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .empty-cart-icon {
          font-size: 64px;
          color: var(--gray-300);
          margin-bottom: var(--space-lg);
        }
        
        .empty-cart h2 {
          margin-bottom: var(--space-md);
        }
        
        .empty-cart p {
          color: var(--gray-600);
          margin-bottom: var(--space-lg);
        }
        
        .cart-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
        }
        
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: var(--space-md);
          padding: var(--space-md);
          align-items: center;
        }
        
        .item-image {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .item-name {
          font-size: 1.125rem;
          margin-bottom: var(--space-xxs);
        }
        
        .item-category {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin-bottom: var(--space-xs);
        }
        
        .item-price {
          font-weight: 500;
        }
        
        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-sm);
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
        }
        
        .quantity-btn {
          background: none;
          border: none;
          color: var(--gray-700);
          padding: var(--space-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .quantity-btn:hover:not(:disabled) {
          color: var(--primary);
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity {
          width: 30px;
          text-align: center;
          font-weight: 600;
        }
        
        .item-subtotal {
          font-weight: 700;
          font-size: 1.125rem;
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xs);
        }
        
        .remove-btn:hover {
          color: var(--error);
        }
        
        .cart-summary {
          padding: var(--space-lg);
        }
        
        .summary-title {
          margin-bottom: var(--space-lg);
          text-align: center;
        }
        
        .summary-rows {
          margin-bottom: var(--space-lg);
          border-bottom: 1px solid var(--gray-200);
          padding-bottom: var(--space-md);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-sm);
          color: var(--gray-700);
        }
        
        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .checkout-btn {
          width: 100%;
          margin-bottom: var(--space-md);
          padding: var(--space-md);
          text-align: center;
        }
        
        .continue-shopping {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs);
          color: var(--gray-600);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }
        
        .continue-shopping:hover {
          color: var(--primary);
          text-decoration: none;
        }
        
        @media (min-width: 768px) {
          .cart-container {
            grid-template-columns: 2fr 1fr;
            align-items: start;
          }
          
          .cart-summary {
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default Varukorg; 