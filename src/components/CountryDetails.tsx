import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCountry } from '../hooks/useCountry';
import { MapPin, Users, Globe2, Clock, X, ArrowLeft } from 'lucide-react';

const CountryDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { country, loading, error } = useCountry(code || '');
  const navigate = useNavigate();

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
        <p className="text-xl text-red-600">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );

  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Background Flag Image */}
      <div className="absolute inset-0">
        <img
          src={country.flag}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative h-full overflow-y-auto">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="relative mx-auto min-h-screen max-w-7xl px-4 py-24">
          <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h1 className="mb-2 text-5xl font-bold text-white">{country.name}</h1>
                <h2 className="mb-8 text-2xl text-white/80">{country.capital}</h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/60">Capital</p>
                      <p className="font-medium text-white">{country.capital || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/60">Population</p>
                      <p className="font-medium text-white">{country.population.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe2 className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/60">Region</p>
                      <p className="font-medium text-white">{country.region}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/60">Timezone</p>
                      <p className="font-medium text-white">{country.timezones[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">Borders</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.borders?.map((border) => (
                      <button
                        key={border}
                        onClick={() => navigate(`/country/${encodeURIComponent(border)}`)}
                        className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        {border}
                      </button>
                    ))}
                    {(!country.borders || country.borders.length === 0) && (
                      <p className="text-white/60">No bordering countries</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Languages</h4>
                    <p className="text-white/80">
                      {country.languages.join(', ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Currency</h4>
                    <p className="text-white/80">{country.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;