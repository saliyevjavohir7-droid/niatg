import React from 'react';
import { ApplicationForm } from './components/ApplicationForm';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biznesingizni Rivojlantiring
            </h1>
            <p className="text-lg text-gray-600">
              Quyidagi formani to'ldiring va mutaxassislarimiz siz bilan bog'lanib, 
              muammolaringizga yechim topishda yordam berishadi.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <ApplicationForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;