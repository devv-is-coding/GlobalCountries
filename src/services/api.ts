import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface CountryResponse {
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  latlng: [number, number];
  borders?: string[];
  timezones: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  flags: {
    png: string;
    svg: string;
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
  try {
    console.log(`Attempting to fetch data from: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`Fetch attempt failed (${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error);
    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw new Error(
      `Failed to fetch data after ${MAX_RETRIES} attempts. The API might be temporarily unavailable. Please try again later.`
    );
  }
};

export class CountryAPI {
  static async getByName(name: string): Promise<Country> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/name/${name}`);
      const data: CountryResponse[] = await response.json();
      if (!data?.length) {
        throw new Error(`No data found for country: ${name}`);
      }
      return this.transformCountryData(data[0]);
    } catch (error) {
      console.error('Error fetching country by name:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while fetching country data'
      );
    }
  }

  static async getByCode(code: string): Promise<Country> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/alpha/${code}`);
      const data: CountryResponse[] = await response.json();
      if (!data?.length) {
        throw new Error(`No data found for country code: ${code}`);
      }
      return this.transformCountryData(data[0]);
    } catch (error) {
      console.error('Error fetching country by code:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while fetching country data'
      );
    }
  }

  static async getAllCountries(): Promise<Country[]> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/all`);
      const data: CountryResponse[] = await response.json();
      if (!data?.length) {
        throw new Error('No countries data available');
      }
      return data.map(this.transformCountryData);
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while fetching countries data'
      );
    }
  }

  private static transformCountryData(data: CountryResponse): Country {
    return {
      name: data.name.common,
      capital: data.capital?.[0] || 'N/A',
      region: data.region,
      subregion: data.subregion,
      population: data.population,
      area: data.area,
      latlng: data.latlng,
      borders: data.borders || [],
      timezones: data.timezones,
      currencies: data.currencies || {},
      languages: data.languages || {},
      flags: data.flags,
    };
  }
}