import React, { createContext, useContext, useState } from 'react';

const VarukorgContext = createContext();

export function VarukorgProvider({ children }) {
  const [varukorg, setVarukorg] = useState([]);


  const laggTillIVarukorg = (produkt) => {
    setVarukorg(prev => {

      const existerande = prev.find(item => item.id === produkt.id);
      if (existerande) {
        return prev.map(item =>
          item.id === produkt.id
            ? { ...item, kvantitet: item.kvantitet + 1 }
            : item
        );
      } else {
        return [...prev, { ...produkt, kvantitet: 1 }];
      }
    });
  };

  // Öka 
  const okaKvantitet = (produktId) => {
    setVarukorg(prev => prev.map(item =>
      item.id === produktId ? { ...item, kvantitet: item.kvantitet + 1 } : item
    ));
  };

  // Minska 
  const minskaKvantitet = (produktId) => {
    setVarukorg(prev => prev
      .map(item =>
        item.id === produktId ? { ...item, kvantitet: item.kvantitet - 1 } : item
      )
      .filter(item => item.kvantitet > 0)
    );
  };

  // Ta bort produkt
  const taBortProdukt = (produktId) => {
    setVarukorg(prev => prev.filter(item => item.id !== produktId));
  };

  return (
    <VarukorgContext.Provider value={{ varukorg, laggTillIVarukorg, okaKvantitet, minskaKvantitet, taBortProdukt }}>
      {children}
    </VarukorgContext.Provider>
  );
}

export function useVarukorg() {
  return useContext(VarukorgContext);
} 