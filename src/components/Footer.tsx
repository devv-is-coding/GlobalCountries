import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B3D41] text-[#E3F6F5] py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Devv's Country Explorer.</p>
      </div>
    </footer>
  );
};

export default Footer;
