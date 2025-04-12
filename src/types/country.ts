export interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  borders: string[];
  timezones: string[];
  currency: string;
  languages: string[];
  flag: string;
}

export interface CountryResponse {
  message: string;
  data: Country[];
  statusCode: number;
}

export interface SingleCountryResponse {
  message: string;
  data: Country;
  statusCode: number;
}

export interface CountryService {
  getAllCountries: () => Promise<Country[]>;
  getCountryByCode: (name: string) => Promise<Country>;
}