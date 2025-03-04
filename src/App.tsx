import React, { useState } from 'react';
import { Calculator, Download } from 'lucide-react';
import CurrencySelector from './components/CurrencySelector';
import ServiceCategory from './components/ServiceCategory';
import QuoteForm from './components/QuoteForm';
import CustomNote from './components/CustomNote';
import { websiteTypes, standardPages, additionalFeatures } from './data/services';
import { FormData } from './types';
import { generateQuote } from './utils/pdfGenerator';

function App() {
  const [selectedCurrency] = useState('INR');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [customNote, setCustomNote] = useState('');

  const handleServiceToggle = (serviceId: string) => {
    if (websiteTypes.find(type => type.id === serviceId)) {
      // For website types, only allow one selection
      setSelectedServices(prev => [
        ...prev.filter(id => !websiteTypes.find(type => type.id === id)),
        serviceId
      ]);
    } else {
      setSelectedServices(prev =>
        prev.includes(serviceId)
          ? prev.filter(id => id !== serviceId)
          : [...prev, serviceId]
      );
    }
  };

  const calculateTotal = () => {
    const selectedItems = [
      ...websiteTypes,
      ...standardPages,
      ...additionalFeatures
    ].filter(service => selectedServices.includes(service.id));

    return selectedItems.reduce((total, service) => total + service.basePrice, 0);
  };

  const handleQuoteDownload = (formData: FormData) => {
    const selectedItems = [
      ...websiteTypes,
      ...standardPages,
      ...additionalFeatures
    ].filter(service => selectedServices.includes(service.id));

    const pdf = generateQuote(selectedItems, customNote, formData);
    pdf.save('web-development-quote.pdf');
    setShowQuoteForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#131D5A] shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-[#FD625D] mr-3" />
              <h1 className="text-3xl font-bold text-white">
                Web Development Cost Estimator
              </h1>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={() => {}}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ServiceCategory
              title="Website Type"
              services={websiteTypes}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
              isRadioSelect={true}
            />
            
            <ServiceCategory
              title="Standard Pages"
              services={standardPages}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />

            <ServiceCategory
              title="Additional Features"
              services={additionalFeatures}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />

            <CustomNote
              value={customNote}
              onChange={setCustomNote}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4 text-[#131D5A]">Selected Services</h2>
              <div className="space-y-4 mb-6">
                {selectedServices.length === 0 ? (
                  <p className="text-gray-500">No services selected</p>
                ) : (
                  selectedServices.map(serviceId => {
                    const service = [...websiteTypes, ...standardPages, ...additionalFeatures]
                      .find(s => s.id === serviceId);
                    return service ? (
                      <div key={service.id} className="flex justify-between">
                        <span className="text-gray-700">{service.name}</span>
                        <span className="font-semibold">₹{service.basePrice.toLocaleString()}</span>
                      </div>
                    ) : null;
                  })
                )}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Estimate</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#FD625D] hover:bg-[#e54d48]"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showQuoteForm && (
        <QuoteForm
          onSubmit={handleQuoteDownload}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
  );
}

export default App;