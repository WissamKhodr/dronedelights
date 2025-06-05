import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Hem from './pages/Hem';
import Meny from './pages/Meny';
import Varukorg from './pages/Varukorg';
import Betalning from './pages/Betalning';
import Bekraftelse from './pages/Bekraftelse';
import LoggaIn from './pages/LoggaIn';
import Registrera from './pages/Registrera';
import Favoriter from './pages/Favoriter';
import { useUser } from './UserContext';
import { useVarukorg } from './VarukorgContext';

function App() {
  const { user, logout } = useUser();
  const { varukorg } = useVarukorg();
  
  
  const cartItemCount = varukorg.reduce((sum, item) => sum + item.kvantitet, 0); // sönder, fixa sen

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="logo">
              <Link to="/">
                <div className="flex items-center gap-sm">
                  <img src="/drone-logo.svg" alt="Drone Delights" width="40" height="40" />
                  <div>
                    <h1 className="logo-text">Drone Delights</h1>
                    <p className="logo-tagline">Rekordsnabba matleveranser</p>
                  </div>
                </div>
              </Link>
            </div>

            <nav className="main-nav">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Hem
              </NavLink>
              <NavLink to="/meny" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Meny
              </NavLink>
              <NavLink to="/favoriter" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Favoriter
              </NavLink>
            </nav>

            <div className="flex items-center gap-md"> 
              {}
              <Link to="/varukorg" className="cart-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
              </Link>

              {}
              <div className="user-menu">
                {user ? (
                  <div className="dropdown">
                    <button className="btn-ghost dropdown-toggle">
                      <span className="user-name">{user.anvandarnamn}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="dropdown-content">
                      <button onClick={logout} className="dropdown-item">
                        Logga ut
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <Link to="/loggain" className="btn btn-outline btn-sm">Logga in</Link>
                    <Link to="/registrera" className="btn btn-primary btn-sm">Registrera</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content"> 
        <div className="container">
          <Routes>
            <Route path="/" element={<Hem />} />
            <Route path="/meny" element={<Meny />} />
            <Route path="/varukorg" element={<Varukorg />} />
            <Route path="/betalning" element={<Betalning />} />
            <Route path="/bekraftelse" element={<Bekraftelse />} />
            <Route path="/loggain" element={<LoggaIn />} />
            <Route path="/registrera" element={<Registrera />} />
            <Route path="/favoriter" element={<Favoriter />} />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-lg">
            <div className="footer-column">
              <h3 className="footer-title">Drone Delights</h3>
              <p className="footer-text">Framtidens matleverans - snabb, effektiv och miljövänlig genom drönarteknik.</p>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Länkar</h3>
              <ul className="footer-links">
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/meny">Meny</Link></li>
                <li><Link to="/varukorg">Varukorg</Link></li>
                <li><Link to="/favoriter">Favoriter</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Kontakt</h3>
              <address className="footer-address"> 
                <p>Norra Bulltoftavägen 65C</p>
                <p>212 43 Malmö</p>
                <p>newton@dronedelights.se</p>
                <p>076-134 83 93</p>
              </address>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Drone Delights. Alla rättigheter reserverade till W.</p> 
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .header {
          background-color: var(--white);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: var(--space-md) 0;
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          color: var(--primary);
        }
        
        .logo-tagline {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin: 0;
        }
        
        .main-nav {
          display: none;
        }
        
        .nav-link {
          font-weight: 600;
          color: var(--gray-700);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-md);
          margin: 0 var(--space-xxs);
          transition: var(--transition);
        }
        
        .nav-link:hover {
          color: var(--primary);
          text-decoration: none;
        }
        
        .nav-link.active {
          color: var(--primary);
          background-color: rgba(136, 61, 0, 0.1);
        }
        
        .cart-button {
          position: relative;
          color: var(--gray-700);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: var(--transition);
        }
        
        .cart-button:hover {
          background-color: var(--gray-100);
          color: var(--primary);
        }
        
        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background-color: var(--primary);
          border-radius: 50%;
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .user-menu {
          position: relative;
        }
        
        .dropdown {
          position: relative;
        }
        
        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: var(--space-xxs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-md);
          color: var(--gray-700);
        }
        
        .user-name {
          font-weight: 600;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          top: 100%;
          min-width: 150px;
          background-color: var(--white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          padding: var(--space-xs);
          z-index: 1;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        .dropdown-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
        }
        
        .dropdown-item:hover {
          background-color: var(--gray-100);
        }
        
        .auth-buttons {
          display: flex;
          gap: var(--space-sm);
        }
        
        .main-content {
          flex-grow: 1;
          padding: var(--space-xl) 0;
        }
        
        .footer {
          background-color: var(--gray-900);
          color: var(--white);
          padding: var(--space-xl) 0 var(--space-md);
          margin-top: auto;
        }
        
        .footer-title {
          color: var(--white);
          font-size: 1.25rem;
          margin-bottom: var(--space-md);
        }
        
        .footer-text {
          color: var(--gray-300);
          margin-bottom: var(--space-md);
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: var(--space-xs);
        }
        
        .footer-links a {
          color: var(--gray-300);
          transition: var(--transition);
        }
        
        .footer-links a:hover {
          color: var(--white);
          text-decoration: none;
        }
        
        .footer-address {
          color: var(--gray-300);
          font-style: normal;
        }
        
        .footer-address p {
          margin-bottom: var(--space-xs);
        }
        
        .footer-bottom {
          margin-top: var(--space-xl);
          padding-top: var(--space-md);
          border-top: 1px solid var(--gray-800);
          text-align: center;
          font-size: 0.875rem;
          color: var(--gray-400);
        }
        
        .mobile-menu-toggle {
          display: block;
          background: none;
          border: none;
          color: var(--gray-700);
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        @media (min-width: 768px) {
          .main-nav {
            display: flex;
          }
          
          .mobile-menu-toggle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App; 