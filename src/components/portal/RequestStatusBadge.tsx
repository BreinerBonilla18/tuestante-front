import React from 'react';
import type { RequestStatus } from '../../types/portal';

const styles: Record<RequestStatus, {label: string;className: string;}> = {
  pendiente: { label: 'Pendiente', className: 'bg-warning-soft text-warning' },
  aprobada: { label: 'Aprobada', className: 'bg-success-soft text-success' },
  rechazada: { label: 'Rechazada', className: 'bg-danger-soft text-danger' }
};

export function RequestStatusBadge({ status }: {status: RequestStatus;}) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium ${s.className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {s.label}
    </span>);

}