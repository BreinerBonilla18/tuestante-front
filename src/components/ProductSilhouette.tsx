import React from 'react';
import type { LineId, LockType } from '../types/catalog';
import { isDarkColor } from '../utils/color';

interface ProductSilhouetteProps {
  line: LineId;
  colorHex?: string;
  lock?: LockType | null;
  className?: string;
}

const OUTLINE = 'rgba(15,23,42,0.55)';
const fillTransition = { transition: 'fill 200ms cubic-bezier(0.23, 1, 0.32, 1)' };

export function ProductSilhouette({ line, colorHex = '#CBD0CC', lock = null, className = '' }: ProductSilhouetteProps) {
  const detail = isDarkColor(colorHex) ? 'rgba(255,255,255,0.38)' : 'rgba(15,23,42,0.3)';
  const body = { fill: colorHex, stroke: OUTLINE, strokeWidth: 1, style: fillTransition };

  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <rect x="10" y="156" width="100" height="1.5" fill="rgba(15,23,42,0.1)" />
      {line === 'lockers' &&
      <g>
          <rect x="18" y="8" width="84" height="144" rx="1.5" {...body} />
          {[20, 61].map((x) =>
        [10, 57, 104].map((y) =>
        <g key={`${x}-${y}`}>
                <rect x={x} y={y} width="39" height="45" fill={colorHex} stroke={detail} strokeWidth="0.8" style={fillTransition} />
                {[6, 9, 12].map((o) =>
          <rect key={o} x={x + 7} y={y + o} width="14" height="1" fill={detail} />
          )}
                <LockMark x={x + 32} y={y + 23} lock={lock ?? 'mecanica'} color={detail} />
              </g>
        )
        )}
          <rect x="22" y="152" width="6" height="4" fill={OUTLINE} />
          <rect x="92" y="152" width="6" height="4" fill={OUTLINE} />
        </g>
      }
      {line === 'cajoneras' &&
      <g>
          <rect x="28" y="36" width="64" height="106" rx="1.5" {...body} />
          {[
        { y: 38, h: 22 },
        { y: 62, h: 30 },
        { y: 94, h: 46 }].
        map((d) =>
        <g key={d.y}>
              <rect x="30" y={d.y} width="60" height={d.h} fill={colorHex} stroke={detail} strokeWidth="0.8" style={fillTransition} />
              <rect x="50" y={d.y + 5} width="20" height="2.5" rx="1" fill={detail} />
            </g>
        )}
          <LockMark x={84} y={45} lock={lock ?? 'mecanica'} color={detail} />
          <circle cx="36" cy="148" r="4" fill={OUTLINE} />
          <circle cx="84" cy="148" r="4" fill={OUTLINE} />
        </g>
      }
      {line === 'estanterias' &&
      <g>
          <rect x="20" y="8" width="4" height="148" {...body} />
          <rect x="96" y="8" width="4" height="148" {...body} />
          {[12, 46, 80, 114, 148].map((y) =>
        <rect key={y} x="20" y={y} width="80" height="4" {...body} />
        )}
          <line x1="24" y1="16" x2="96" y2="46" stroke={OUTLINE} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="96" y1="16" x2="24" y2="46" stroke={OUTLINE} strokeWidth="0.5" strokeOpacity="0.4" />
        </g>
      }
      {line === 'armarios' &&
      <g>
          <rect x="22" y="8" width="76" height="144" rx="1.5" {...body} />
          <line x1="60" y1="10" x2="60" y2="150" stroke={detail} strokeWidth="0.8" />
          <rect x="54" y="72" width="2" height="18" rx="1" fill={detail} />
          <rect x="64" y="72" width="2" height="18" rx="1" fill={detail} />
          <LockMark x={60} y={64} lock={lock ?? 'mecanica'} color={detail} />
          <rect x="26" y="152" width="6" height="4" fill={OUTLINE} />
          <rect x="88" y="152" width="6" height="4" fill={OUTLINE} />
        </g>
      }
    </svg>);

}

function LockMark({ x, y, lock, color }: {x: number;y: number;lock: LockType;color: string;}) {
  if (lock === 'digital') return <rect x={x - 2} y={y - 3} width="4" height="6" rx="0.6" fill={color} />;
  if (lock === 'rfid') {
    return (
      <g>
        <rect x={x - 2.5} y={y - 2.5} width="5" height="5" rx="1" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx={x} cy={y} r="0.9" fill={color} />
      </g>);

  }
  return <circle cx={x} cy={y} r="1.6" fill={color} />;
}