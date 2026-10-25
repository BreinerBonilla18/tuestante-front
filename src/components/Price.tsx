import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { formatMoney } from '../utils/currency';

interface PriceProps {
  usd: number;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
  align?: 'left' | 'right';
  inline?: boolean;
}

const primarySize = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' };
const secondarySize = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };

export function Price({ usd, size = 'md', prefix, align = 'left', inline = false }: PriceProps) {
  const { currency, rate } = useCurrency();
  const primary = formatMoney(usd, currency, rate);
  const secondary = formatMoney(usd, currency === 'USD' ? 'VES' : 'USD', rate);

  return (
    <div
      className={`tabular-nums ${align === 'right' ? 'text-right' : ''} ${
      inline ? 'flex flex-wrap items-baseline gap-x-2' : ''}`
      }>
      
      <div className={`${primarySize[size]} font-semibold text-ink`}>
        {prefix && <span className="mr-1 text-xs font-normal text-muted">{prefix}</span>}
        {primary}
      </div>
      <div className={`${secondarySize[size]} text-muted`}>{secondary}</div>
    </div>);

}