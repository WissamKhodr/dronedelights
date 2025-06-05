import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { VarukorgProvider } from './VarukorgContext';
import { FavoritProvider } from './FavoritContext';
import { UserProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <FavoritProvider>
          <VarukorgProvider>
            <App />
          </VarukorgProvider>
        </FavoritProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
); 