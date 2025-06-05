import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function Bekraftelse() {
  const location = useLocation();
  const bestallning = location.state?.bestallning;

  useEffect(() => {

    if (bestallning) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  }, [bestallning]);
  
  if (!bestallning) {

    return <Navigate to="/meny" />;
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('sv-SE', options);
  };
  

  const orderNumber = `DD-${Math.floor(100000 + Math.random() * 900000)}`;
  

  const now = new Date();
  const deliveryStart = new Date(now.getTime() + 20 * 60000);
  const deliveryEnd = new Date(now.getTime() + 30 * 60000);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };
  
  const deliveryTimeRange = `${formatTime(deliveryStart)}-${formatTime(deliveryEnd)}`;

  return (
    <div className="confirmation-page">
      <div className="success-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.9972 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#00BA88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#00BA88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <h1 className="confirmation-title">Tack för din beställning!</h1>
      
      <div className="confirmation-message">
        <p>Din beställning har mottagits och förbereds nu för leverans. En drönare kommer leverera din mat till din adress inom kort.</p>
      </div>
      
      <div className="order-details-container">
        <div className="order-details card">
          <div className="order-header">
            <div>
              <h2>Beställningsdetaljer</h2>
              <p className="order-number">#{orderNumber}</p>
            </div>
            <div className="order-status">
              <span className="status-badge">Bekräftad</span>
            </div>
          </div>
          
          <div className="delivery-details">
            <div className="detail-row">
              <div className="detail-label">Beställt:</div>
              <div className="detail-value">{formatDate(bestallning.datum)}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Förväntad leverans:</div>
              <div className="detail-value">{deliveryTimeRange}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Leveransadress:</div>
              <div className="detail-value">
                {bestallning.leverans.namn}<br />
                {bestallning.leverans.gata} {bestallning.leverans.husnummer}<br />
                {bestallning.leverans.stad}
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Betalningsmetod:</div>
              <div className="detail-value">
                {bestallning.paymentMethod === 'kort' ? 'Kontokort' : 'Swish'}
              </div>
            </div>
          </div>
          
          <div className="order-items">
            <h3>Produkter</h3>
            <ul className="items-list">
              {bestallning.produkter.map((item) => (
                <li key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-quantity">{item.kvantitet}x</span>
                    <span className="item-name">{item.namn}</span>
                  </div>
                  <span className="item-price">{item.pris * item.kvantitet} SEK</span>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Totalt</span>
              <span>{bestallning.totalPris} SEK</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="track-order">
        <div className="track-visualization">
          <div className="track-step active">
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Bekräftad</span>
          </div>
          <div className="track-line active"></div>
          <div className="track-step active">
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Förbereds</span>
          </div>
          <div className="track-line"></div>
          <div className="track-step">
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>På väg</span>
          </div>
          <div className="track-line"></div>
          <div className="track-step">
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Levererad</span>
          </div>
        </div>
      </div>
      
      <div className="actions">
        <Link to="/meny" className="btn btn-primary">Handla igen</Link>
      </div>
      
      <style jsx>{`
        .confirmation-page {
          text-align: center;
          padding-bottom: var(--space-xxl);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .success-icon {
          margin: 0 auto var(--space-lg);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--success);
          background-color: rgba(0, 186, 136, 0.1);
          border-radius: 50%;
        }
        
        .confirmation-title {
          margin-bottom: var(--space-md);
          color: var(--success);
        }
        
        .confirmation-message {
          margin-bottom: var(--space-xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          color: var(--gray-600);
        }
        
        .order-details-container {
          margin-bottom: var(--space-xl);
        }
        
        .order-details {
          text-align: left;
          padding: var(--space-lg);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--gray-200);
        }
        
        .order-number {
          color: var(--gray-600);
          margin-top: var(--space-xxs);
          font-size: 0.875rem;
        }
        
        .order-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .status-badge {
          display: inline-block;
          padding: var(--space-xxs) var(--space-sm);
          background-color: rgba(0, 186, 136, 0.1);
          color: var(--success);
          font-weight: 600;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
        }
        
        .delivery-details {
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-lg);
          border-bottom: 1px solid var(--gray-200);
        }
        
        .detail-row {
          display: flex;
          margin-bottom: var(--space-sm);
        }
        
        .detail-label {
          width: 30%;
          font-weight: 600;
          color: var(--gray-700);
        }
        
        .detail-value {
          width: 70%;
          color: var(--gray-800);
        }
        
        .order-items h3 {
          margin-bottom: var(--space-md);
        }
        
        .items-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-lg) 0;
        }
        
        .order-item {
          display: flex;
          justify-content: space-between;
          padding: var(--space-xs) 0;
        }
        
        .item-info {
          display: flex;
        }
        
        .item-quantity {
          margin-right: var(--space-sm);
          font-weight: 600;
          color: var(--primary);
        }
        
        .item-price {
          font-weight: 600;
        }
        
        .order-total {
          display: flex;
          justify-content: space-between;
          border-top: 2px solid var(--gray-200);
          padding-top: var(--space-md);
          font-weight: 700;
          font-size: 1.125rem;
        }
        
        .track-order {
          margin-bottom: var(--space-xl);
        }
        
        .track-visualization {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 auto;
          max-width: 600px;
        }
        
        .track-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--gray-400);
        }
        
        .track-step.active {
          color: var(--primary);
        }
        
        .step-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--gray-200);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-xs);
          color: var(--gray-500);
        }
        
        .track-step.active .step-icon {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        
        .track-line {
          flex-grow: 1;
          height: 3px;
          background-color: var(--gray-200);
          position: relative;
          margin: 0 var(--space-xs);
        }
        
        .track-line.active {
          background-color: var(--primary-light);
        }
        
        .actions {
          margin-top: var(--space-xl);
        }
      `}</style>
    </div>
  );
}

export default Bekraftelse; 