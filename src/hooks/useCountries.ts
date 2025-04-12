import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { RestCountriesAPI } from '../services/api';

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

        // Deduplicate by country name (case-insensitive)
        const uniqueCountries = Array.from(
          new Map(data.map((country) => [country.name.toLowerCase(), country])).values()
        );

        // Optional: Sort alphabetically by country name
        const sortedUniqueCountries = uniqueCountries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedUniqueCountries);
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
