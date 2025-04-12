import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/country/${encodeURIComponent(country.name)}`)}
      className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`View details for ${country.name}`}
    >
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 w-full p-4 text-left">
          <h2 className="text-xl font-bold text-white">
            {country.name}
          </h2>
        </div>
      </div>
    </button>
  );
};

export default CountryCard;