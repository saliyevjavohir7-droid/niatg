import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Niat Marketing</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Bosh Sahifa</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Xizmatlar</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Portfolio</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Aloqa</a>
        </nav>
      </div>
    </header>
  );
};