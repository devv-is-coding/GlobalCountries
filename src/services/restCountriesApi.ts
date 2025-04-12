import axios from 'axios';
import type { Country, CountryResponse, SingleCountryResponse, CountryService } from '../types/country';

const BASE_URL = 'https://countries-api-abhishek.vercel.app';

export class RestCountriesAPI implements CountryService {
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await axios.get<CountryResponse>(`${BASE_URL}/countries`);
      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response format');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        throw new Error(`Failed to fetch countries: ${error.message}`);
      }
      console.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  }

  async getCountryByCode(name: string): Promise<Country> {
    try {
      const response = await axios.get<SingleCountryResponse>(`${BASE_URL}/countries/${name}`);
      if (!response.data.data) {
        throw new Error('Country not found');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        throw new Error(`Failed to fetch country details: ${error.message}`);
      }
      console.error('Error fetching country:', error);
      throw new Error('Failed to fetch country details');
    }
  }
}