import React from 'react';
import { IndianRupee } from 'lucide-react';

const currencies = [
  { code: 'INR', symbol: '₹', rate: 1 },
];

export default function CurrencySelector({ 
  selectedCurrency, 
  onCurrencyChange 
}: { 
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
      <IndianRupee className="w-5 h-5 text-gray-600" />
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="bg-transparent border-none focus:outline-none text-gray-600"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}