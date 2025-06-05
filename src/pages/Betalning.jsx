import React, { useState } from 'react';
import { useVarukorg } from '../VarukorgContext';
import { useNavigate } from 'react-router-dom';

function Betalning() {
  const { varukorg, tomVarukorg } = useVarukorg();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    namn: '', 
    stad: '', 
    gata: '', 
    husnummer: '', 
    paymentMethod: '',
    kortNummer: '',
    kortExpiry: '',
    kortCVC: '',
    swishNummer: ''
  });
  const [fel, setFel] = useState('');
  const [loading, setLoading] = useState(false);

  const totalPris = varukorg.reduce((sum, item) => sum + item.pris * item.kvantitet, 0);

  const hanteraChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (fel) setFel('');
  };

  const hanteraSubmit = async (e) => {
    e.preventDefault();
    setFel('');
    
    if (!form.namn || !form.stad || !form.gata || !form.husnummer || !form.paymentMethod) {
      setFel('Fyll i alla fält och välj betalningsmetod.');
      return;
    }
    
    if (form.paymentMethod === 'kort') {
      if (!form.kortNummer || !form.kortExpiry || !form.kortCVC) {
        setFel('Fyll i alla kortuppgifter.');
        return;
      }
      if (form.kortNummer.replace(/\s/g, '').length !== 16) {
        setFel('Kortnumret måste vara 16 siffror.');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(form.kortExpiry)) {
        setFel('Ange utgångsdatum i formatet MM/ÅÅ');
        return;
      }
      if (!/^\d{3,4}$/.test(form.kortCVC)) {
        setFel('CVC-koden måste vara 3 eller 4 siffror.');
        return;
      }
    } else if (form.paymentMethod === 'swish') {
      if (!form.swishNummer) {
        setFel('Ange ditt telefonnummer för Swish.');
        return;
      }
      if (!/^07\d{8}$/.test(form.swishNummer.replace(/\s/g, ''))) {
        setFel('Ange ett giltigt svenskt mobilnummer för Swish (07X XXX XXXX).');
        return;
      }
    }
    
    if (varukorg.length === 0) {
      setFel('Din varukorg är tom!');
      return;
    }
    
    const bestallning = {
      id: Date.now(),
      produkter: varukorg,
      totalPris,
      leverans: {
        namn: form.namn,
        stad: form.stad,
        gata: form.gata,
        husnummer: form.husnummer
      },
      paymentMethod: form.paymentMethod,
      datum: new Date().toISOString()
    };
    
    setLoading(true);
    
    setTimeout(async () => {
      try {
    // Spara till jsonnn servern
        const res = await fetch('http://localhost:3004/bestallningar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bestallning)
      });
        
        if (!res.ok) throw new Error('Kunde inte spara beställningen');
        
        tomVarukorg();
        
      navigate('/bekraftelse', { state: { bestallning } });
    } catch (err) {
        setFel('Beställt!');
        setLoading(false);
    }
    }, 1500);
  };

  return (
    <div className="payment-page">
      <div className="page-header">
      <h1>Betalning</h1>
      </div>
      
      {varukorg.length === 0 ? (
        <div className="empty-cart-message">
          <p>Din varukorg är tom. Gå till <a href="/meny">menyn</a> och lägg till produkter.</p>
        </div>
      ) : (
        <div className="payment-container">
          <div className="payment-form-container">
            <form className="payment-form" onSubmit={hanteraSubmit}>
              <div className="form-section">
                <h2 className="section-title">
                  <span className="section-number">1</span>
                  Leveransinformation
                </h2>
                
                <div className="form-group">
                  <label htmlFor="namn">Fullständigt namn</label>
                  <input 
                    type="text" 
                    id="namn" 
                    name="namn" 
                    value={form.namn}
                    onChange={hanteraChange}
                    placeholder="Förnamn Efternamn"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="gata">Gatunamn</label>
                    <input 
                      type="text" 
                      id="gata"
                      name="gata"
                      value={form.gata}
                      onChange={hanteraChange}
                      placeholder="Gatuadress"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="husnummer">Husnummer</label>
                    <input 
                      type="text"
                      id="husnummer"
                      name="husnummer"
                      value={form.husnummer}
                      onChange={hanteraChange}
                      placeholder="Nr"
                      required
                      style={{ width: '80px' }}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="stad">Stad</label>
                  <input
                    type="text"
                    id="stad"
                    name="stad"
                    value={form.stad}
                    onChange={hanteraChange}
                    placeholder="Ort"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">
                  <span className="section-number">2</span>
                  Betalningsmetod
                </h2>
                
                <div className="payment-methods">
                  <label className={`payment-method ${form.paymentMethod === 'kort' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="kort"
                      checked={form.paymentMethod === 'kort'}
                      onChange={hanteraChange}
                      className="payment-radio"
                    />
                    <div className="payment-method-content">
                      <div className="payment-method-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                          <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span>Kontokort</span>
                    </div>
                  </label>
                  
                  <label className={`payment-method ${form.paymentMethod === 'swish' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="swish"
                      checked={form.paymentMethod === 'swish'}
                      onChange={hanteraChange}
                      className="payment-radio"
                    />
                    <div className="payment-method-content">
                    <div className="payment-method-icon">
                      <img src="/swish.png" alt="Swish" style={{ width: 32, height: 32 }} />
                    </div>
                    <span>Swish</span>
                    </div>
                  </label>
                </div>
                
                {form.paymentMethod === 'kort' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label htmlFor="kortNummer">Kortnummer</label>
                      <input
                        type="text"
                        id="kortNummer"
                        name="kortNummer"
                        value={form.kortNummer}
                        onChange={hanteraChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required={form.paymentMethod === 'kort'}
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label htmlFor="kortExpiry">Utgångsdatum</label>
                        <input
                          type="text"
                          id="kortExpiry"
                          name="kortExpiry"
                          value={form.kortExpiry}
                          onChange={hanteraChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required={form.paymentMethod === 'kort'}
                        />
                      </div>
                      
                      <div className="form-group flex-1">
                        <label htmlFor="kortCVC">CVC/CVV</label>
                        <input
                          type="text"
                          id="kortCVC"
                          name="kortCVC"
                          value={form.kortCVC}
                          onChange={hanteraChange}
                          placeholder="123"
                          maxLength="4"
                          required={form.paymentMethod === 'kort'}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {form.paymentMethod === 'swish' && (
                  <div className="swish-details">
                    <div className="form-group">
                      <label htmlFor="swishNummer">Mobilnummer för Swish</label>
                      <input
                        type="tel"
                        id="swishNummer"
                        name="swishNummer"
                        value={form.swishNummer}
                        onChange={hanteraChange}
                        placeholder="07XX XX XX XX"
                        required={form.paymentMethod === 'swish'}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {fel && <div className="form-error">{fel}</div>}
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <span className="loading">
                      <span className="loading-spinner"></span>
                      Bearbetar...
                    </span>
                  ) : (
                    'Slutför Beställning'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <div className="card">
              <h2 className="summary-title">Din beställning</h2>
              <ul className="order-items">
          {varukorg.map(item => (
                  <li key={item.id} className="order-item">
                    <span className="item-quantity">{item.kvantitet}x</span>
                    <span className="item-name">{item.namn}</span>
                    <span className="item-price">{item.pris * item.kvantitet} SEK</span>
                  </li>
          ))}
        </ul>
              <div className="order-total">
                <span>Totalt</span>
                <span>{totalPris} SEK</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .payment-page {
          padding-bottom: var(--space-xxl);
        }
        
        .page-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        
        .empty-cart-message {
          text-align: center;
          padding: var(--space-xxl) 0;
        }
        
        .payment-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
        }
        
        .payment-form-container {
          width: 100%;
        }
        
        .payment-form {
          width: 100%;
        }
        
        .form-section {
          margin-bottom: var(--space-xl);
        }
        
        .section-title {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          margin-bottom: var(--space-lg);
        }
        
        .section-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background-color: var(--primary);
          color: var(--white);
          border-radius: 50%;
          font-size: 0.875rem;
          margin-right: var(--space-sm);
        }
        
        .form-group {
          margin-bottom: var(--space-md);
        }
        
        .form-row {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }
        
        .flex-1 {
          flex: 1;
        }
        
        .payment-methods {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }
        
        .payment-method {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-md);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .payment-method.active {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }
        
        .payment-radio {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .payment-method-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .payment-method-icon {
          margin-bottom: var(--space-xs);
          font-size: 24px;
          color: var(--gray-700);
        }
        
        .payment-method.active .payment-method-icon {
          color: var(--primary);
        }
        
        .card-details, .swish-details {
          margin-top: var(--space-md);
          padding: var(--space-md);
          background-color: var(--gray-100);
          border-radius: var(--radius-md);
        }
        
        .form-actions {
          margin-top: var(--space-xl);
        }
        
        .loading {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: var(--white);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .order-summary .card {
          padding: var(--space-lg);
        }
        
        .summary-title {
          margin-bottom: var(--space-lg);
          text-align: center;
          font-size: 1.25rem;
        }
        
        .order-items {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-lg) 0;
        }
        
        .order-item {
          display: flex;
          align-items: center;
          padding: var(--space-xs) 0;
          border-bottom: 1px solid var(--gray-200);
        }
        
        .item-quantity {
          font-weight: 600;
          margin-right: var(--space-md);
          color: var(--primary);
        }
        
        .item-name {
          flex: 1;
        }
        
        .item-price {
          font-weight: 600;
        }
        
        .order-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          font-size: 1.25rem;
          margin-top: var(--space-md);
          padding-top: var(--space-md);
          border-top: 2px solid var(--gray-200);
        }
        
        @media (min-width: 768px) {
          .payment-container {
            grid-template-columns: 2fr 1fr;
          }
          
          .order-summary {
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default Betalning; 