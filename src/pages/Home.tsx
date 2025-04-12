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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F0F7F4] to-[#D6EADF]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#3A5A98] mx-auto mb-4" />
        <p className="text-[#2B3D41] animate-pulse">Loading countries...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EAF4F4] to-[#D7FBE8]">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-xl text-center">
        <div className="mb-4 rounded-full bg-[#E3F6F5] p-3 inline-block">
          <Globe2 className="h-8 w-8 text-[#3A5A98]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2B3D41] mb-2">Error Loading Countries</h2>
        <p className="text-[#4C9A2A] mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#3A5A98] px-6 py-2 text-white transition-colors hover:bg-[#2F4C85] focus:outline-none focus:ring-2 focus:ring-[#3A5A98] focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const totalCountries = filteredCountries.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F4] to-[#EAF4F4] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#2B3D41] mb-4">
            Visualizing Country Information
          </h1>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3A5A98]" />
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full rounded-xl border-2 border-[#D0E1F9] bg-[#E8F0FE] pl-12 pr-4 py-3 focus:border-[#3A5A98] focus:outline-none focus:ring-2 focus:ring-[#A4C3D9] transition-all duration-200 text-[#2B3D41]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3A5A98]" />
            <select
              className="w-full appearance-none rounded-xl border-2 border-[#D0E1F9] bg-[#E8F0FE] pl-12 pr-10 py-3 focus:border-[#3A5A98] focus:outline-none focus:ring-2 focus:ring-[#A4C3D9] transition-all duration-200 text-[#2B3D41]"
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
              <svg className="h-4 w-4 text-[#3A5A98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-center text-[#3A5A98] mb-8">
          Showing {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
          {search && ` matching "${search}"`}
          {region && ` in ${region}`}
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <Globe2 className="h-16 w-16 text-[#A4C3D9] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#2B3D41] mb-2">No Countries Found</h2>
            <p className="text-[#4C9A2A]">
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
