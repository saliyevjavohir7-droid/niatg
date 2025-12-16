import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">Niat Marketing</span>
            <p className="text-gray-400 text-sm mt-1">Sizning biznesingiz, bizning maqsadimiz.</p>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Niat Marketing. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </div>
    </footer>
  );
};