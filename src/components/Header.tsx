import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">World Explorer</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;