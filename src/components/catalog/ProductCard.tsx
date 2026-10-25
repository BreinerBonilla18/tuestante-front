import React from 'react';
import { Link } from 'react-router-dom';
import { lockOptions } from '../../data/configOptions';
import { productLines } from '../../data/productLines';
import { ralColors } from '../../data/ralColors';
import type { Product } from '../../types/catalog';
import { Price } from '../Price';
import { ProductPlaceholder } from '../ProductPlaceholder';

export function ProductCard({ product }: {product: Product;}) {
  const line = productLines.find((l) => l.id === product.line);
  const colors = ralColors.filter((c) => product.colors.includes(c.code));
  const locks = lockOptions.filter((l) => product.lockTypes.includes(l.id)).map((l) => l.label);

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      
      <div className="relative">
        <ProductPlaceholder
          line={product.line}
          name={product.name}
          className="aspect-[4/5] transition-colors duration-200 ease-out group-hover:bg-[#ECEFF3]" />
        
        {product.isNew &&
        <span className="absolute left-3 top-3 rounded-sm bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
            Nuevo
          </span>
        }
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs text-muted">{line?.shortName} · {product.sku}</p>
        <h3 className="mt-1 text-[15px] font-medium leading-snug text-ink group-hover:underline group-hover:decoration-line group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{locks.length > 0 ? `Cerradura ${locks.join(' · ')}` : 'Sin cerradura'}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <Price usd={product.basePriceUsd} size="sm" prefix="Desde" />
          <ul className="flex -space-x-1" aria-label={`${colors.length} colores disponibles`}>
            {colors.slice(0, 5).map((c) =>
            <li key={c.code} className="h-3.5 w-3.5 rounded-full border border-white ring-1 ring-line" style={{ backgroundColor: c.hex }} title={`RAL ${c.code}`} />
            )}
          </ul>
        </div>
      </div>
    </Link>);

}