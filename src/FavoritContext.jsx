import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

const FavoritContext = createContext();

export function FavoritProvider({ children }) {
  const { user, setUser } = useUser();
  const favoriter = user?.favoriter || [];

  // +favorit Lägg till favorit
  const laggTillFavorit = async (produkt) => {
    if (!user) return;
    if (favoriter.some(fav => fav.id === produkt.id)) return;
    const nyaFavoriter = [...favoriter, produkt];
    await fetch(`http://localhost:3004/anvandare/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriter: nyaFavoriter })
    });
    setUser({ ...user, favoriter: nyaFavoriter });
  };

  // -favorit Ta bort favorit
  const taBortFavorit = async (produktId) => {
    if (!user) return;
    const nyaFavoriter = favoriter.filter(fav => fav.id !== produktId);
    await fetch(`http://localhost:3004/anvandare/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriter: nyaFavoriter })
    });
    setUser({ ...user, favoriter: nyaFavoriter });
  };

  const arFavorit = (produktId) => favoriter.some(fav => fav.id === produktId);

  return (
    <FavoritContext.Provider value={{ favoriter, laggTillFavorit, taBortFavorit, arFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavoriter() {
  return useContext(FavoritContext);
} 