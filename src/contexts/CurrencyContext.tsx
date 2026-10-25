import React, { createContext, useContext, useMemo, useState } from 'react';
import { pricing } from '../data/pricing';
import type { Currency } from '../types/quote';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rate: number;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: {children: React.ReactNode;}) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const value = useMemo(() => ({ currency, setCurrency, rate: pricing.exchangeRate }), [currency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency debe usarse dentro de CurrencyProvider');
  return ctx;
}