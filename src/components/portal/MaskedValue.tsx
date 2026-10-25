import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export function MaskedValue({ value, revealed, className = '' }: {value: string;revealed: boolean;className?: string;}) {
  if (revealed) return <span className={`tabular-nums ${className}`}>{value}</span>;
  return (
    <span className={`tabular-nums tracking-widest ${className}`} aria-label="Dato oculto">
      ••••••
    </span>);

}

export function RevealToggle({ revealed, onToggle }: {revealed: boolean;onToggle: () => void;}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={revealed}
      className="inline-flex h-9 items-center gap-2 rounded border border-line bg-white px-3 text-sm text-ink transition-colors duration-150 hover:border-muted">
      
      {revealed ? <EyeOffIcon className="h-4 w-4" aria-hidden="true" /> : <EyeIcon className="h-4 w-4" aria-hidden="true" />}
      {revealed ? 'Ocultar montos' : 'Mostrar montos'}
    </button>);

}