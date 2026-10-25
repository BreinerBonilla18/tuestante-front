import React from 'react';
import { CheckIcon } from 'lucide-react';
import { heightRanges } from '../../data/catalogFilters';
import { lockOptions } from '../../data/configOptions';
import { productLines } from '../../data/productLines';
import { ralColors } from '../../data/ralColors';
import type { FilterKey } from './useCatalogFilters';

interface CatalogFiltersProps {
  selected: Record<FilterKey, string[]>;
  onToggle: (key: FilterKey, value: string) => void;
  onClear: () => void;
  activeCount: number;
}

export function CatalogFilters({ selected, onToggle, onClear, activeCount }: CatalogFiltersProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">Filtros</h2>
        {activeCount > 0 &&
        <button type="button" onClick={onClear} className="text-xs font-medium text-accent hover:underline">
            Limpiar ({activeCount})
          </button>
        }
      </div>
      <FilterGroup legend="Línea de producto">
        {productLines.map((l) =>
        <CheckRow key={l.id} label={l.shortName} checked={selected.linea.includes(l.id)} onChange={() => onToggle('linea', l.id)} />
        )}
      </FilterGroup>
      <FilterGroup legend="Tipo de cerradura">
        {lockOptions.map((l) =>
        <CheckRow key={l.id} label={l.label} checked={selected.cerradura.includes(l.id)} onChange={() => onToggle('cerradura', l.id)} />
        )}
      </FilterGroup>
      <FilterGroup legend="Altura">
        {heightRanges.map((r) =>
        <CheckRow key={r.id} label={r.label} checked={selected.altura.includes(r.id)} onChange={() => onToggle('altura', r.id)} />
        )}
      </FilterGroup>
      <fieldset>
        <legend className="mb-3 text-xs font-medium text-muted">Color RAL</legend>
        <div className="grid grid-cols-4 gap-2">
          {ralColors.map((c) => {
            const active = selected.color.includes(c.code);
            return (
              <button
                key={c.code}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle('color', c.code)}
                title={`RAL ${c.code} · ${c.name}`}
                className={`flex flex-col items-center gap-1 rounded-sm p-1 text-[10px] tabular-nums transition-colors duration-150 ${
                active ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface'}`
                }>
                
                <span
                  className={`h-7 w-full rounded-sm border border-black/10 ${active ? 'ring-2 ring-accent ring-offset-1' : ''}`}
                  style={{ backgroundColor: c.hex }} />
                
                {c.code}
              </button>);

          })}
        </div>
      </fieldset>
    </div>);

}

function FilterGroup({ legend, children }: {legend: string;children: React.ReactNode;}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-muted">{legend}</legend>
      <div className="space-y-0.5">{children}</div>
    </fieldset>);

}

function CheckRow({ label, checked, onChange }: {label: string;checked: boolean;onChange: () => void;}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 ${
        checked ? 'border-accent bg-accent' : 'border-line bg-white'}`
        }
        aria-hidden="true">
        
        {checked && <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      {label}
    </label>);

}