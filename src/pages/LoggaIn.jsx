import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function LoggaIn() {
  const [anvandarnamn, setAnvandarnamn] = useState('');
  const [losenord, setLosenord] = useState('');
  const [fel, setFel] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const hanteraInloggning = async (e) => {
    e.preventDefault();
    setFel('');
    const success = await login(anvandarnamn, losenord);
    if (success) {
      navigate('/');
    } else {
      setFel('Fel användarnamn eller lösenord.');
    }
  };

  return (
    <div>
      <h1>Logga In</h1>
      <form onSubmit={hanteraInloggning}>
        <label>
          Användarnamn:
          <input type="text" value={anvandarnamn} onChange={(e) => setAnvandarnamn(e.target.value)} required />
        </label>
        <br/>
        <label>
          Lösenord:
          <input type="password" value={losenord} onChange={(e) => setLosenord(e.target.value)} required />
        </label>
        <br/>
        {fel && <p style={{ color: 'red' }}>{fel}</p>}
        <button type="submit">Logga In</button>
      </form>
    </div>
  );
}

export default LoggaIn; 