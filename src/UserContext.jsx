import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const sparad = localStorage.getItem('user');
    return sparad ? JSON.parse(sparad) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  
  const login = async (anvandarnamn, losenord) => {
    try {
      const res = await fetch(`http://localhost:3004/anvandare?anvandarnamn=${anvandarnamn}&losenord=${losenord}`);
      const data = await res.json();
      if (data.length === 1) {
        setUser(data[0]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  
  const logout = () => setUser(null);

  
  const register = async (anvandarnamn, losenord) => {
    try {
      
      const res = await fetch(`http://localhost:3004/anvandare?anvandarnamn=${anvandarnamn}`);
      const data = await res.json();
      if (data.length > 0) return false;
      
      const ny = { anvandarnamn, losenord, favoriter: [] };
      const res2 = await fetch('http://localhost:3004/anvandare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ny)
      });
      const userData = await res2.json();
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 