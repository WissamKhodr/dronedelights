import React, { useEffect, useState } from 'react';
import { hamtaAllaProdukter } from '../api/api';
import { useVarukorg } from '../VarukorgContext';
import { useFavoriter } from '../FavoritContext';
import { useUser } from '../UserContext';

function Meny() {
  const [produkter, setProdukter] = useState([]);
  const [filtreradeProdukter, setFiltreradeProdukter] = useState([]);
  const [aktivKategori, setAktivKategori] = useState('Alla');
  const [sokning, setSokning] = useState('');
  const { laggTillIVarukorg } = useVarukorg();
  const { laggTillFavorit, taBortFavorit, arFavorit } = useFavoriter();
  const { user } = useUser();

  useEffect(() => {
    const laddaProdukter = async () => {
      const data = await hamtaAllaProdukter();
      setProdukter(data);
      setFiltreradeProdukter(data); 
    };
    laddaProdukter();
  }, []);

  const kategorier = ['Alla', ...new Set(produkter.map(p => p.kategori))];

  const filtreraProdukter = () => {
    let resultat = [...produkter];
    
    
    if (aktivKategori !== 'Alla') {
      resultat = resultat.filter(p => p.kategori === aktivKategori);
    }
    
    
    if (sokning.trim()) {
      const sokOrd = sokning.toLowerCase().trim();
      resultat = resultat.filter(p => 
        p.namn.toLowerCase().includes(sokOrd) || 
        p.beskrivning.toLowerCase().includes(sokOrd)
      );
    }
    
    setFiltreradeProdukter(resultat);
  };

  useEffect(() => {
    filtreraProdukter();
  }, [aktivKategori, sokning, produkter]);

  const handleKategoriClick = (kategori) => {
    setAktivKategori(kategori);
  };

  const handleSokningChange = (e) => {
    setSokning(e.target.value);
  };

  const handleLaggTillVarukorg = (produkt) => {
    laggTillIVarukorg(produkt);
  };

  const handleToggleFavorit = (produkt) => {
    if (!user) {
      alert('Du måste vara inloggad för att spara favoriter!');
      return;
    }
    
    if (arFavorit(produkt.id)) {
      taBortFavorit(produkt.id);
      alert(`${produkt.namn} har tagits bort från dina favoriter!`);
    } else {
      laggTillFavorit(produkt);
      alert(`${produkt.namn} har lagts till i dina favoriter!`);
    }
  };

  return (
    <div className="meny-page">
      <header className="page-header">
        <h1>Vår Meny</h1>
        <p className="page-description">
          Utforska vårt stora utbud av maträtter, speciellt utvalda för drönarleverans.
        </p>
      </header>
      
      <div className="filter-container">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Sök efter maträtter..." 
            value={sokning} 
            onChange={handleSokningChange}
            className="search-input"
          />
          {sokning && (
            <button className="clear-search" onClick={() => setSokning('')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        
        <div className="categories">
          {kategorier.map(kategori => (
            <button
              key={kategori}
              onClick={() => handleKategoriClick(kategori)}
              className={`category-btn ${aktivKategori === kategori ? 'active' : ''}`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>
      
      {filtreradeProdukter.length === 0 ? (
        <div className="no-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>Inga produkter hittades</h3>
          <p>Försök med en annan sökning eller kategori</p>
          <button className="btn btn-outline" onClick={() => {setSokning(''); setAktivKategori('Alla');}}>
            Återställ filter
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filtreradeProdukter.map(produkt => (
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
                  <div className="button-group">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleLaggTillVarukorg(produkt)}
                    >
                      Lägg i varukorg
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleToggleFavorit(produkt)}
                      style={{marginLeft: '8px'}}
                    >
                      <span style={{color: 'white'}}>♥</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .meny-page {
          padding-bottom: var(--space-xxl);
        }
        
        .page-header {
          text-align: center;
          margin-bottom: var(--space-xl);
          background-color: #f5f5f8;
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
        }
        
        .page-description {
          max-width: 600px;
          margin: 0 auto;
          color: var(--gray-600);
          font-size: 1.125rem;
        }
        
        .filter-container {
          margin-bottom: var(--space-xl);
        }
        
        .search-box {
          position: relative;
          margin-bottom: var(--space-lg);
        }
        
        .search-icon {
          position: absolute;
          left: var(--space-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-500);
        }
        
        .search-input {
          width: 100%;
          padding: var(--space-md) var(--space-md) var(--space-md) calc(var(--space-md) * 3);
          border-radius: var(--radius-full);
          border: 2px solid var(--gray-200);
          font-size: 1rem;
        }
        
        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }
        
        .clear-search {
          position: absolute;
          right: var(--space-md);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--space-xxs);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .clear-search:hover {
          background-color: var(--gray-200);
          color: var(--gray-700);
        }
        
        .categories {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }
        
        .category-btn {
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-full);
          border: 2px solid var(--gray-200);
          background-color: var(--white);
          color: var(--gray-700);
          font-weight: 500;
          transition: var(--transition);
        }
        
        .category-btn:hover {
          border-color: var(--primary-light);
          color: var(--primary);
        }
        
        .category-btn.active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--white);
        }
        
        .no-results {
          text-align: center;
          padding: var(--space-xxl) 0;
          color: var(--gray-600);
        }
        
        .no-results svg {
          margin-bottom: var(--space-md);
          color: var(--gray-400);
        }
        
        .no-results h3 {
          margin-bottom: var(--space-sm);
          color: var(--gray-700);
        }
        
        .no-results p {
          margin-bottom: var(--space-lg);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-lg);
        }
        
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
          border-radius: var(--radius-lg);
          transition: var(--transition);
        }
        
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
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
        
        .favorite-btn {
          position: absolute;
          top: var(--space-sm);
          left: var(--space-sm);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          border-radius: 0;
          cursor: pointer;
          box-shadow: none;
          transition: transform 0.2s;
          z-index: 10;
        }
        
        .favorite-btn:hover {
          transform: scale(1.15);
        }
        
        .favorite-btn svg {
          fill: #FF6B00;
          stroke: #FF6B00;
          width: 28px;
          height: 28px;
          transition: transform 0.2s;
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
        
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .categories {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: var(--space-sm);
            margin-bottom: var(--space-md);
          }
          
          .category-btn {
            white-space: nowrap;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Meny; 