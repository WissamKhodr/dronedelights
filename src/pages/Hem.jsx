import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hamtaAllaProdukter } from '../api/api';
import { useVarukorg } from '../VarukorgContext';

function Hem() {
  const [popularaProdukter, setPopularaProdukter] = useState([]);
  const { laggTillIVarukorg } = useVarukorg();
  
  useEffect(() => {
    const laddaProdukter = async () => {
      const allaProdukter = await hamtaAllaProdukter();
      const antal = Math.min(3, allaProdukter.length);
      const slumpadeProdukter = [...allaProdukter]
        .sort(() => 0.5 - Math.random())
        .slice(0, antal);
      
      setPopularaProdukter(slumpadeProdukter);
    };
    
    laddaProdukter();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Matleverans från himlen</h1>
          <p className="hero-subtitle">Snabb och miljövänlig leverans med drönare, direkt till din dörr</p>
          <div className="hero-cta">
            <Link to="/meny" className="btn btn-primary btn-lg">Se vår meny</Link>
          </div>
        </div>
        <div className="hero-image">
          <video 
            src="/dronevid.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="hero-video" 
          />
        </div>
      </section>
      
      <section className="how-it-works">
        <h2 className="section-title">Så fungerar det</h2>
        <div className="steps grid md:grid-cols-3 gap-lg">
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>1. Beställ</h3>
            <p>Välj dina favoriträtter från vår meny och lägg din beställning genom några enkla klick.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8H19M5 8C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6C21 7.10457 20.1046 8 19 8M5 8L5 18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V8M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>2. Tillagning</h3>
            <p>Våra kockar tillagar din mat med färska råvaror och kärlek, precis när du beställer.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13L12 7L5 13M12 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 3L19 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>3. Leverans</h3>
            <p>Vår drönare levererar din mat direkt till din angivna adress på rekordtid.</p>
          </div>
        </div>
      </section>
      
      <section className="popular-products">
        <h2 className="section-title">Populära rätter</h2>
        <div className="grid md:grid-cols-3 gap-lg">
          {popularaProdukter.map(produkt => (
            <div key={produkt.id} className="product-card card">
              <div className="product-image">
                <img src={produkt.bildUrl} alt={produkt.namn} />
                <span className="badge badge-primary product-category">{produkt.kategori}</span>
              </div>
              <div className="product-info">
                <h3 className="product-title">{produkt.namn}</h3>
                <p className="product-description">{produkt.beskrivning}</p>
                <div className="product-footer">
                  <span className="product-price">{produkt.pris} SEK</span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      laggTillIVarukorg(produkt);
                      alert(`${produkt.namn} har lagts till i din varukorg!`);
                    }}
                  >
                    Beställ nu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/meny" className="btn btn-outline">Se hela menyn</Link>
        </div>
      </section>
      
      <section className="omdome">
        <h2 className="section-title">Vad våra kunder säger</h2>
        <div className="grid md:grid-cols-2 gap-lg">
          <div className="omdome card">
            <div className="omdome-content">
              <svg className="quote-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20H4C4 13.3726 9.37258 8 16 8V12C11.5817 12 8 15.5817 8 20H10C12.2091 20 14 21.7909 14 24V28C14 30.2091 12.2091 32 10 32H6C3.79086 32 2 30.2091 2 28V24C2 21.7909 3.79086 20 6 20H10ZM30 20H24C24 13.3726 29.3726 8 36 8V12C31.5817 12 28 15.5817 28 20H30C32.2091 20 34 21.7909 34 24V28C34 30.2091 32.2091 32 30 32H26C23.7909 32 22 30.2091 22 28V24C22 21.7909 23.7909 20 26 20H30Z" fill="currentColor" opacity="0.2"/>
              </svg>
              <p className="omdome-text">"Helt otroligt! Maten kom fram varm och fräsch på bara 15 minuter. Drönarleverans är framtiden!"</p>
              <div className="omdome-forfattare">
                <div className="omdome-avatar">
                  <span>LP</span>
                </div>
                <div className="omdome-info">
                  <h4>Henrik Svensson</h4>
                  <p>Malmöbo</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="omdome card">
            <div className="omdome-content">
              <svg className="quote-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20H4C4 13.3726 9.37258 8 16 8V12C11.5817 12 8 15.5817 8 20H10C12.2091 20 14 21.7909 14 24V28C14 30.2091 12.2091 32 10 32H6C3.79086 32 2 30.2091 2 28V24C2 21.7909 3.79086 20 6 20H10ZM30 20H24C24 13.3726 29.3726 8 36 8V12C31.5817 12 28 15.5817 28 20H30C32.2091 20 34 21.7909 34 24V28C34 30.2091 32.2091 32 30 32H26C23.7909 32 22 30.2091 22 28V24C22 21.7909 23.7909 20 26 20H30Z" fill="currentColor" opacity="0.2"/>
              </svg>
              <p className="omdome-text">"Älskar kvaliteten på maten och den snabba leveransen. Har beställt varje vecka sedan jag upptäckte Drone Delights!"</p>
              <div className="omdome-forfattare">
                <div className="omdome-avatar">
                  <span>AJ</span>
                </div>
                <div className="omdome-info">
                  <h4>Erik Erisson</h4>
                  <p>Matentusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .home-page {
          margin-bottom: var(--space-xxl);
        }
        
        .hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-xl);
          margin-bottom: var(--space-xxl);
          align-items: center;
        }
        
        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: var(--space-md);
          color: var(--dark);
          line-height: 1.2;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-700);
          margin-bottom: var(--space-lg);
          max-width: 500px;
        }
        
        .hero-cta {
          margin-top: var(--space-lg);
        }
        
        .hero-image {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          height: auto;
          width: 100%;
          background-color: var(--gray-900);
          display: flex;
          align-items: center;
          justify-content: center;
          max-height: 500px;
          min-height: 350px;
          aspect-ratio: 5 / 9;
        }
        
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: var(--radius-lg);
          background-color: var(--gray-900);
          filter: grayscale(1);
        }
        
        .how-it-works {
          margin-bottom: var(--space-xxl);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: var(--space-xl);
          font-size: 2rem;
          font-weight: 700;
        }
        
        .step {
          text-align: center;
          padding: var(--space-lg);
        }
        
        .step-icon {
          margin: 0 auto var(--space-md);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          background-color: rgba(255, 107, 0, 0.1);
          border-radius: 50%;
        }
        
        .step h3 {
          font-size: 1.25rem;
          margin-bottom: var(--space-sm);
        }
        
        .popular-products {
          margin-bottom: var(--space-xxl);
        }
        
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
        }
        
        .product-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        .product-category {
          position: absolute;
          top: var(--space-sm);
          right: var(--space-sm);
        }
        
        .product-info {
          padding: var(--space-lg);
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-title {
          font-size: 1.25rem;
          margin-bottom: var(--space-xs);
        }
        
        .product-description {
          color: var(--gray-600);
          margin-bottom: var(--space-md);
          flex-grow: 1;
        }
        
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .product-price {
          font-weight: 700;
          color: var(--dark);
          font-size: 1.125rem;
        }
        
        .view-all {
          text-align: center;
          margin-top: var(--space-xl);
        }
        
        .omdomes {
          margin-bottom: var(--space-xxl);
        }
        
        .omdome {
          height: 100%;
        }
        
        .omdome-content {
          position: relative;
          padding: var(--space-lg) 0;
        }
        
        .quote-icon {
          color: var(--primary);
          margin-bottom: var(--space-md);
        }
        
        .omdome-text {
          font-size: 1.125rem;
          font-style: italic;
          color: var(--gray-700);
          margin-bottom: var(--space-lg);
        }
        
        .omdome-forfattare {
          display: flex;
          align-items: center;
        }
        
        .omdome-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: var(--space-md);
        }
        
        .omdome-info h4 {
          margin: 0;
          font-size: 1rem;
        }
        
        .omdome-info p {
          margin: 0;
          color: var(--gray-600);
          font-size: 0.875rem;
        }
        
        @media (min-width: 768px) {
          .hero {
            grid-template-columns: 1fr 1fr;
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .hero-image {
            min-height: 300px;
          }
        }
        
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .hero-image {
            min-height: 350px;
          }
        }
      `}</style>
    </div>
  );
}

export default Hem; 