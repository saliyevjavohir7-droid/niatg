import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Briefcase, 
  Building2, 
  Users, 
  MapPin, 
  AlertCircle, 
  DollarSign, 
  Target, 
  Send,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { FormData, FormStatus, ApiResponse } from '../types';
import { GOOGLE_SCRIPT_URL, EMPLOYEE_RANGES } from '../constants';

export const ApplicationForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    ism: '',
    telefon: '',
    biznes: '',
    biznes_turi: '',
    xodimlar: '',
    manzil: '',
    muammo: '',
    byudjet: '',
    natija: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    setErrorMessage('');

    // Basic Validation
    if (!formData.ism.trim() || !formData.telefon.trim()) {
      setStatus(FormStatus.ERROR);
      setErrorMessage('Ism va Telefon raqami majburiy!');
      return;
    }

    try {
      // Note: Google Apps Script Web Apps require no-cors mode for simple GET/POST from browser 
      // OR specific setup. Ideally we use standard fetch. 
      // If CORS issues arise in development, use a proxy or test on production domain.
      // For this implementation, we assume the GAS script handles CORS correctly with doOptions.
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // 'no-cors' mode is often used with GAS if you don't need to read the response body in the browser due to redirects.
        // However, the requirement asked for a JSON response. 
        // We try standard mode first. If it fails due to GAS redirect, we might need a workaround.
        // But the GAS code provided in backend/Code.gs implements proper CORS headers.
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (result.status === 'success') {
        setStatus(FormStatus.SUCCESS);
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback for demo purposes if URL is invalid placeholder
      if (GOOGLE_SCRIPT_URL.includes('PLACEHOLDER')) {
        setErrorMessage('Tizim sozlanmagan (API URL). Iltimos admin bilan bog\'laning.');
      } else {
        setErrorMessage('Xatolik yuz berdi. Iltimos keyinroq qayta urinib ko\'ring.');
      }
      setStatus(FormStatus.ERROR);
    }
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Muvaffaqiyatli yuborildi!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Arizangiz qabul qilindi. Tez orada mutaxassislarimiz ko'rsatilgan telefon raqami orqali siz bilan bog'lanishadi.
        </p>
        <button 
          onClick={() => {
            setFormData({
              ism: '', telefon: '', biznes: '', biznes_turi: '', xodimlar: '', manzil: '', muammo: '', byudjet: '', natija: ''
            });
            setStatus(FormStatus.IDLE);
          }}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Yangi ariza yuborish
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
      
      {/* Section 1: Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Shaxsiy Ma'lumotlar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="ism" className="block text-sm font-medium text-gray-700">Ism Familiya *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="ism"
                name="ism"
                required
                value={formData.ism}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="Abdulla Qodiriy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">Telefon Raqam *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                required
                value={formData.telefon}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="+998 90 123 45 67"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Business Info */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Biznes Haqida</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="biznes" className="block text-sm font-medium text-gray-700">Biznes Nomi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="biznes"
                name="biznes"
                value={formData.biznes}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="My Company LLC"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="biznes_turi" className="block text-sm font-medium text-gray-700">Faoliyat Turi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="biznes_turi"
                name="biznes_turi"
                value={formData.biznes_turi}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="Masalan: O'quv markazi"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="xodimlar" className="block text-sm font-medium text-gray-700">Xodimlar Soni</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="xodimlar"
                name="xodimlar"
                value={formData.xodimlar}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
              >
                <option value="">Tanlang...</option>
                {EMPLOYEE_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="manzil" className="block text-sm font-medium text-gray-700">Manzil</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="manzil"
                name="manzil"
                value={formData.manzil}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="Toshkent sh, Chilonzor..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Details */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Muammo va Yechim</h3>
        
        <div className="space-y-2">
          <label htmlFor="muammo" className="block text-sm font-medium text-gray-700">Muammo (Qisqacha)</label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <AlertCircle className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="muammo"
              name="muammo"
              rows={3}
              value={formData.muammo}
              onChange={handleChange}
              className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
              placeholder="Sotuvlar kam, mijozlar yetishmovchiligi..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="byudjet" className="block text-sm font-medium text-gray-700">Byudjet ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="byudjet"
                name="byudjet"
                value={formData.byudjet}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
                placeholder="1000"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="natija" className="block text-sm font-medium text-gray-700">Kutilayotgan Natija</label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="natija"
              name="natija"
              rows={3}
              value={formData.natija}
              onChange={handleChange}
              className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-2.5 transition-shadow"
              placeholder="Oyiga 50 ta yangi mijoz..."
            />
          </div>
        </div>
      </div>

      {status === FormStatus.ERROR && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === FormStatus.SUBMITTING}
          className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === FormStatus.SUBMITTING ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Yuborilmoqda...
            </>
          ) : (
            <>
              Yuborish <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};