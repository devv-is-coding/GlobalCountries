import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { RestCountriesAPI } from '../services/restCountriesApi';

const api = new RestCountriesAPI();

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await api.getAllCountries();
        if (!data.length) {
          throw new Error('No countries data received');
        }
        setCountries(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch countries';
        setError(`${errorMessage}. Please try again later.`);
        console.error('Error in useCountries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}