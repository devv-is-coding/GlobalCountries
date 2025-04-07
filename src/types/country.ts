export interface Country {
    name: string;
    capital: string;
    region: string;
    subregion: string;
    population: number;
    area: number;
    latlng: [number, number];
    borders: string[];
    timezones: string[];
    currencies: {
      [key: string]: {
        name: string;
        symbol: string;
      };
    };
    languages: {
      [key: string]: string;
    };
    flags: {
      png: string;
      svg: string;
    };
  }
  
  export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
  
  export interface CountryFilter {
    search: string;
    region: Region | '';
    sortBy: 'population' | 'area' | '';
  }