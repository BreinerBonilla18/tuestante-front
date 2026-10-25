import React from 'react';
import type { Locker } from '../../types/portal';

interface LockerBankProps {
  lockers: Locker[];
  highlightId?: string | null;
  selectedId?: string | null;
  onSelect?: (locker: Locker) => void;
}

const statusStyle: Record<Locker['status'], string> = {
  asignado: 'bg-white border-line text-ink',
  libre: 'bg-success-soft border-success/30 text-success',
  mantenimiento: 'bg-warning-soft border-warning/30 text-warning'
};

export function LockerBank({ lockers, highlightId, selectedId, onSelect }: LockerBankProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 bg-surface p-3 sm:grid-cols-6">
      {lockers.map((l) => {
        const highlighted = l.id === highlightId;
        const selected = l.id === selectedId;
        const content =
        <>
            <span className="text-xs font-semibold tabular-nums">{l.id}</span>
            <span className="mt-auto truncate text-[10px] opacity-80">
              {l.status === 'asignado' ? l.assigneeName : l.status === 'libre' ? 'Libre' : 'Mantenimiento'}
            </span>
          </>;

        const cls = `flex aspect-[3/4] flex-col items-start rounded-sm border p-2 text-left ${
        highlighted ? 'border-accent bg-accent text-white' : statusStyle[l.status]} ${
        selected ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface' : ''}`;
        return onSelect ?
        <button key={l.id} type="button" onClick={() => onSelect(l)} aria-pressed={selected} className={`${cls} transition-colors duration-150 hover:border-accent`}>
            {content}
          </button> :

        <div key={l.id} className={cls} aria-current={highlighted ? 'true' : undefined}>
            {content}
          </div>;

      })}
    </div>);

}