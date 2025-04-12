import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { RestCountriesAPI } from '../services/api';

const api = new RestCountriesAPI();

export function useCountry(code: string) {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setError('No country code provided');
      setLoading(false);
      return;
    }

    const fetchCountry = async () => {
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

  // Optional: Reset state when code changes
  useEffect(() => {
    setCountry(null); // Reset to prevent stale data flash
    setError(null);
  }, [code]);

  return { country, loading, error };
}
