import React from 'react';

interface OptionStepProps {
  index: number;
  title: string;
  value?: string;
  children: React.ReactNode;
}

export function OptionStep({ index, title, value, children }: OptionStepProps) {
  return (
    <section className="border-t border-line py-7" aria-labelledby={`step-${index}`}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id={`step-${index}`} className="text-base font-semibold text-ink">
          <span className="mr-2 tabular-nums text-muted">{index}</span>
          {title}
        </h2>
        {value && <span className="truncate text-sm text-muted">{value}</span>}
      </div>
      {children}
    </section>);

}

interface OptionRowProps {
  selected: boolean;
  disabledReason?: string | null;
  onSelect: () => void;
  title: string;
  description: string;
  price?: string;
  type?: 'radio' | 'checkbox';
}

export function OptionRow({ selected, disabledReason, onSelect, title, description, price, type = 'radio' }: OptionRowProps) {
  const disabled = Boolean(disabledReason);
  return (
    <button
      type="button"
      role={type}
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
      disabled ?
      'cursor-not-allowed border-line bg-surface' :
      selected ?
      'border-accent bg-accent-soft' :
      'border-line bg-white hover:border-muted'}`
      }>
      
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${type === 'radio' ? 'rounded-full' : 'rounded-sm'} ${
        selected ? 'border-accent bg-accent' : 'border-line bg-white'}`
        }>
        
        {selected && <span className={`bg-white ${type === 'radio' ? 'h-1.5 w-1.5 rounded-full' : 'h-1.5 w-1.5 rounded-[1px]'}`} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-medium ${disabled ? 'text-muted' : 'text-ink'}`}>{title}</span>
        <span className="mt-0.5 block text-xs text-muted">{disabled ? disabledReason : description}</span>
      </span>
      {price && <span className={`shrink-0 text-xs tabular-nums ${disabled ? 'text-subtle' : 'text-muted'}`}>{price}</span>}
    </button>);

}