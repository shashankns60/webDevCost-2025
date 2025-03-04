export interface ServiceOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
}

export interface FormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
}

export interface CurrencyRate {
  code: string;
  symbol: string;
  rate: number;
}