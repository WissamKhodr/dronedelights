const API_URL = 'http://localhost:3004';

export const hamtaAllaProdukter = async () => {
  try {
    const response = await fetch(`${API_URL}/produkter`);
    if (!response.ok) {
      throw new Error('Misslyckades hämta produkter');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    return [];
  }
};

