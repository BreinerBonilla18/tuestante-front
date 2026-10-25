import React from 'react';
import type { LineId, LockType } from '../types/catalog';
import { ProductSilhouette } from './ProductSilhouette';

interface ProductPlaceholderProps {
  line: LineId;
  name: string;
  colorHex?: string;
  lock?: LockType | null;
  label?: string;
  showName?: boolean;
  className?: string;
  silhouetteClassName?: string;
}

export function ProductPlaceholder({
  line,
  name,
  colorHex,
  lock,
  label,
  showName = false,
  className = '',
  silhouetteClassName = 'h-[62%] w-auto'
}: ProductPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Imagen referencial: ${name}`}
      className={`relative flex items-center justify-center overflow-hidden bg-surface ${className}`}>
      
      <ProductSilhouette line={line} colorHex={colorHex} lock={lock} className={silhouetteClassName} />
      {label && <span className="absolute left-3 top-3 text-[11px] font-medium text-muted">{label}</span>}
      {showName &&
      <span className="absolute bottom-3 left-3 right-3 truncate text-[11px] text-muted">{name}</span>
      }
    </div>);

}