import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { RestCountriesAPI } from '../services/restCountriesApi';

const api = new RestCountriesAPI();

export function useCountry(code: string) {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) return;
      
      try {
        setLoading(true);
        const data = await api.getCountryByCode(code);
        setCountry(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        console.error('Error in useCountry:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  return { country, loading, error };
}