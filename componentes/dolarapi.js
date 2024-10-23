// dolarapi.js
import { useState, useEffect } from 'react';

const useDolar = () => {
  const [precioDolar, setPrecioDolar] = useState(null);
  const [fechaDolar, setfechaDolar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        if (!response.ok) {
          throw new Error('Problemas de conexión');
        }
        return response.json();
      })
      .then(data => {
        const precio = data.rates.ARS; 
        setPrecioDolar(precio);
        const fecha = data.date;
        setfechaDolar(fecha);
      })
      .catch(err => {
        setError(err.message);
        console.error('Error al obtener el precio del dólar:', err);
      });
  }, []);

  return { precioDolar, fechaDolar, error };
};

export default useDolar;