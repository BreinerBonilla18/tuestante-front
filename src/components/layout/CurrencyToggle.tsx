import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import type { Currency } from '../../types/quote';

interface CurrencyToggleProps {
  tone?: 'light' | 'surface';
}

const options: Currency[] = ['USD', 'VES'];

export function CurrencyToggle({ tone = 'light' }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div
      role="group"
      aria-label="Moneda de visualización"
      className={`inline-flex rounded border border-line p-0.5 ${tone === 'surface' ? 'bg-white' : 'bg-surface'}`}>
      
      {options.map((option) => {
        const active = option === currency;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => setCurrency(option)}
            className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
            active ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`
            }>
            
            {option}
          </button>);

      })}
    </div>);

}