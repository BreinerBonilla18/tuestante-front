import React, { useState } from 'react';
import { RequestProductDialog } from '../../components/portal/RequestProductDialog';
import { ProductSilhouette } from '../../components/ProductSilhouette';
import { pricing } from '../../data/pricing';
import { productLines } from '../../data/productLines';
import { products } from '../../data/products';
import type { LineId, Product } from '../../types/catalog';
import { formatUsd } from '../../utils/currency';

export function PortalCatalog() {
  const [line, setLine] = useState<LineId | 'todas'>('todas');
  const [selected, setSelected] = useState<Product | null>(null);
  const list = products.filter((p) => line === 'todas' || p.line === line);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Catálogo interno</h1>
      <p className="mt-1 text-sm text-muted">
        Precios para el personal con {pricing.internalDiscount * 100} % de descuento sobre la configuración estándar. Pagaderos por crédito de nómina.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por línea">
        {[{ id: 'todas' as const, shortName: 'Todas' }, ...productLines].map((l) =>
        <button
          key={l.id}
          type="button"
          aria-pressed={line === l.id}
          onClick={() => setLine(l.id)}
          className={`h-8 rounded-sm px-3 text-sm transition-colors duration-150 ${line === l.id ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-line'}`}>
          
            {l.shortName}
          </button>
        )}
      </div>

      <table className="mt-6 w-full text-sm">
        <caption className="sr-only">Productos con precio interno</caption>
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted">
            <th scope="col" className="py-3 font-medium">Producto</th>
            <th scope="col" className="hidden py-3 text-right font-medium md:table-cell">Precio público</th>
            <th scope="col" className="py-3 text-right font-medium">Precio interno</th>
            <th scope="col" className="py-3"><span className="sr-only">Acción</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {list.map((p) =>
          <tr key={p.slug}>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface">
                    <ProductSilhouette line={p.line} className="h-9 w-auto" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-ink">{p.name}</p>
                    <p className="text-xs text-muted">{p.sku}</p>
                  </div>
                </div>
              </td>
              <td className="hidden py-3 text-right tabular-nums text-muted line-through md:table-cell">{formatUsd(p.basePriceUsd)}</td>
              <td className="py-3 text-right font-semibold tabular-nums text-ink">{formatUsd(p.basePriceUsd * (1 - pricing.internalDiscount))}</td>
              <td className="py-3 pl-4 text-right">
                <button type="button" onClick={() => setSelected(p)} className="h-8 rounded border border-line px-3 text-xs font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent">
                  Solicitar
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <RequestProductDialog product={selected} onClose={() => setSelected(null)} />
    </div>);

}