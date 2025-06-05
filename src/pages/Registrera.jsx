import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function Registrera() {
   const [anvandarnamn, setAnvandarnamn] = useState('');
   const [losenord, setLosenord] = useState('');
   const [bekraftaLosenord, setBekraftaLosenord] = useState('');
   const [fel, setFel] = useState('');
   const navigate = useNavigate();
   const { register } = useUser();

   const hanteraRegistrering = async (e) => {
      e.preventDefault();
      setFel('');
      if (losenord !== bekraftaLosenord) {
         setFel('Lösenorden matchar inte.');
         return;
      }
      const success = await register(anvandarnamn, losenord);
      if (success) {
         navigate('/');
      } else {
         setFel('Användarnamnet är redan upptaget.');
      }
   };

  return (
    <div>
      <h1>Registrera dig</h1>
      <form onSubmit={hanteraRegistrering}>
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
        <label>
          Bekräfta Lösenord:
          <input type="password" value={bekraftaLosenord} onChange={(e) => setBekraftaLosenord(e.target.value)} required />
        </label>
        <br/>
        {fel && <p style={{ color: 'red' }}>{fel}</p>}
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}

export default Registrera; 