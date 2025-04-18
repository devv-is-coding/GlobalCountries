import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#2B3D41] shadow-md">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-[#E3F6F5]" />
          <h1 className="text-2xl font-bold text-[#E3F6F5]">Devv's Country Explorer</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
