import React from 'react';
import { useFavoriter } from '../FavoritContext';

function Favoriter() {
  const { favoriter, taBortFavorit } = useFavoriter();

  return (
    <div>
      <h1>Dina Favoriter</h1>
      {favoriter.length === 0 ? (
        <p>Du har inga favoriter ännu.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {favoriter.map(produkt => (
            <div key={produkt.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <img
                src={produkt.bildUrl}
                alt={produkt.namn}
                style={{ width: '100%', maxWidth: '180px', height: 'auto', borderRadius: '6px', marginBottom: '10px' }}
              />
              <h3>{produkt.namn}</h3>
              <p style={{ fontStyle: 'italic', color: '#888' }}>{produkt.kategori}</p>
              <p>{produkt.beskrivning}</p>
              <p style={{ fontWeight: 'bold', margin: '8px 0' }}>{produkt.pris} SEK</p>
              <button style={{ padding: '6px 12px', borderRadius: '4px', background: '#ffb300', color: '#fff', border: 'none', marginTop: '10px' }}
                onClick={() => taBortFavorit(produkt.id)}>
                Ta bort favorit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoriter; 