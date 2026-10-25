import React from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import type { QuoteItem } from '../../types/quote';
import { formatMoney } from '../../utils/currency';
import { Price } from '../Price';
import { ProductSilhouette } from '../ProductSilhouette';

interface QuoteItemRowProps {
  item: QuoteItem;
  onQty: (qty: number) => void;
  onRemove: () => void;
}

export function QuoteItemRow({ item, onQty, onRemove }: QuoteItemRowProps) {
  const { currency, rate } = useCurrency();
  const details = [
  `RAL ${item.config.colorCode} ${item.config.colorName}`,
  item.config.finishLabel,
  `Cerradura ${item.config.lockLabel.toLowerCase()}`,
  item.config.dimensionLabel,
  ...item.config.accessoryLabels];


  return (
    <li className="grid grid-cols-[72px_1fr] gap-4 py-6 sm:grid-cols-[96px_1fr_auto]">
      <Link to={`/producto/${item.productSlug}`} className="flex aspect-square items-center justify-center bg-surface">
        <ProductSilhouette line={item.line} colorHex={item.config.colorHex} lock={item.config.lock} className="h-[72%] w-auto" />
        <span className="sr-only">{item.productName}</span>
      </Link>
      <div className="min-w-0">
        <Link to={`/producto/${item.productSlug}`} className="font-medium text-ink hover:underline">
          {item.productName}
        </Link>
        <p className="text-xs text-muted">SKU {item.sku}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{details.join(' · ')}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="inline-flex items-center rounded border border-line">
            <button type="button" onClick={() => onQty(item.qty - 1)} disabled={item.qty <= 1} className="flex h-8 w-8 items-center justify-center text-muted hover:text-ink disabled:opacity-40" aria-label="Disminuir cantidad">
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <label htmlFor={`qty-${item.id}`} className="sr-only">Cantidad de {item.productName}</label>
            <input
              id={`qty-${item.id}`}
              type="number"
              min={1}
              value={item.qty}
              onChange={(e) => onQty(Number(e.target.value) || 1)}
              className="h-8 w-12 border-x border-line text-center text-sm tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
            
            <button type="button" onClick={() => onQty(item.qty + 1)} className="flex h-8 w-8 items-center justify-center text-muted hover:text-ink" aria-label="Aumentar cantidad">
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-xs tabular-nums text-muted">× {formatMoney(item.unitPriceUsd, currency, rate)}</span>
          <button type="button" onClick={onRemove} className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted hover:text-danger sm:ml-0">
            <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
            Quitar
          </button>
        </div>
      </div>
      <div className="col-start-2 sm:col-start-auto">
        <Price usd={item.unitPriceUsd * item.qty} size="sm" align="right" />
      </div>
    </li>);

}