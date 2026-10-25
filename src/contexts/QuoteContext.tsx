import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { pricing } from '../data/pricing';
import { initialQuoteItems } from '../data/sampleQuote';
import type { ClientInfo, QuoteItem, SubmittedQuote } from '../types/quote';
import { addDaysIso, todayIso } from '../utils/dates';

interface QuoteContextValue {
  items: QuoteItem[];
  itemCount: number;
  addItem: (item: Omit<QuoteItem, 'id'>) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  submitted: SubmittedQuote | null;
  submitQuote: (client: ClientInfo) => SubmittedQuote;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<QuoteItem[]>(initialQuoteItems);
  const [submitted, setSubmitted] = useState<SubmittedQuote | null>(null);

  const addItem = useCallback((item: Omit<QuoteItem, 'id'>) => {
    setItems((prev) => [...prev, { ...item, id: `q-${Date.now()}` }]);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, Math.min(999, qty)) } : i));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const submitQuote = useCallback(
    (client: ClientInfo) => {
      const issuedAt = todayIso();
      const quote: SubmittedQuote = {
        number: `TE-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
        issuedAt,
        validUntil: addDaysIso(issuedAt, pricing.validityDays),
        client,
        items,
        rate: pricing.exchangeRate,
        ivaRate: pricing.ivaRate
      };
      setSubmitted(quote);
      setItems([]);
      return quote;
    },
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, i) => sum + i.qty, 0),
      addItem,
      updateQty,
      removeItem,
      submitted,
      submitQuote
    }),
    [items, addItem, updateQty, removeItem, submitted, submitQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote debe usarse dentro de QuoteProvider');
  return ctx;
}