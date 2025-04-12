import React, { useState, useMemo } from 'react';
import { Search, Filter, Globe2, Loader2 } from 'lucide-react';
import { useCountries } from '../hooks/useCountries';
import CountryCard from '../components/CountryCard';

const Home: React.FC = () => {
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === '' || country.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  const regions = useMemo(() => {
    return Array.from(new Set(countries.map((country) => country.region))).sort();
  }, [countries]);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 animate-pulse">Loading countries...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-xl text-center">
        <div className="mb-4 rounded-full bg-red-100 p-3 inline-block">
          <Globe2 className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Countries</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const totalCountries = filteredCountries.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Visualizing Country Information
          </h1>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full rounded-xl border-2 border-gray-200 pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white pl-12 pr-10 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Showing {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
          {search && ` matching "${search}"`}
          {region && ` in ${region}`}
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <Globe2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Countries Found</h2>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCountries.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;