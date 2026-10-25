import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckIcon, InboxIcon, XIcon } from 'lucide-react';
import { RequestStatusBadge } from '../../components/portal/RequestStatusBadge';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import type { RequestStatus, RequestType } from '../../types/portal';
import { formatUsd } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

interface PortalRequestsProps {
  mode: 'mine' | 'approvals';
}

const typeLabels: Record<RequestType, string> = { producto: 'Producto', locker: 'Locker', credito: 'Crédito' };
const filters: {id: RequestStatus | 'todas';label: string;}[] = [
{ id: 'todas', label: 'Todas' },
{ id: 'pendiente', label: 'Pendientes' },
{ id: 'aprobada', label: 'Aprobadas' },
{ id: 'rechazada', label: 'Rechazadas' }];


export function PortalRequests({ mode }: PortalRequestsProps) {
  const { user, requests, setRequestStatus } = usePortalSession();
  const [filter, setFilter] = useState<RequestStatus | 'todas'>(mode === 'approvals' ? 'pendiente' : 'todas');
  if (!user) return null;
  if (mode === 'approvals' && user.role === 'empleado') return <Navigate to="/portal/solicitudes" replace />;

  const scoped = requests.filter((r) => mode === 'mine' ? r.employeeId === user.employeeId : r.employeeId !== user.employeeId);
  const list = scoped.filter((r) => filter === 'todas' || r.status === filter);
  const countFor = (id: RequestStatus | 'todas') => id === 'todas' ? scoped.length : scoped.filter((r) => r.status === id).length;

  const decide = (id: string, status: RequestStatus) => {
    setRequestStatus(id, status);
    toast.success(status === 'aprobada' ? 'Solicitud aprobada' : 'Solicitud rechazada', { description: id });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{mode === 'mine' ? 'Mis solicitudes' : 'Aprobaciones'}</h1>
      <p className="mt-1 text-sm text-muted">
        {mode === 'mine' ? 'Solicitudes internas de productos, lockers y créditos.' : 'Solicitudes del equipo que requieren su decisión.'}
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4" role="group" aria-label="Filtrar por estado">
        {filters.map((f) =>
        <button
          key={f.id}
          type="button"
          aria-pressed={filter === f.id}
          onClick={() => setFilter(f.id)}
          className={`h-8 rounded-sm px-3 text-sm transition-colors duration-150 ${filter === f.id ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-line'}`}>
          
            {f.label} <span className="tabular-nums opacity-70">{countFor(f.id)}</span>
          </button>
        )}
      </div>

      {list.length === 0 ?
      <div className="flex flex-col items-center py-20 text-center">
          <InboxIcon className="h-10 w-10 text-subtle" aria-hidden="true" />
          <p className="mt-4 font-medium text-ink">{mode === 'approvals' && filter === 'pendiente' ? 'No hay solicitudes pendientes' : 'No hay solicitudes en esta vista'}</p>
          <p className="mt-1 text-sm text-muted">{mode === 'approvals' ? 'Las nuevas solicitudes del equipo aparecerán aquí.' : 'Puede crear una desde el catálogo interno o su locker.'}</p>
        </div> :

      <ul className="divide-y divide-line">
          {list.map((r) =>
        <li key={r.id} className="grid gap-3 py-5 md:grid-cols-[96px_1fr_auto] md:items-center md:gap-6">
              <div className="text-xs text-muted">
                <p className="tabular-nums">{r.id}</p>
                <p>{formatDate(r.createdAt)}</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-ink">
                  <span className="mr-2 rounded-sm bg-surface px-1.5 py-0.5 text-[11px] text-muted">{typeLabels[r.type]}</span>
                  {r.title}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {mode === 'approvals' && <span className="text-ink">{r.employeeName} · </span>}
                  {r.detail}
                  {r.amountUsd !== null && <span className="tabular-nums"> · {formatUsd(r.amountUsd)}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                {mode === 'approvals' && r.status === 'pendiente' ?
            <>
                    <button type="button" onClick={() => decide(r.id, 'rechazada')} className="inline-flex h-8 items-center gap-1.5 rounded border border-line px-3 text-xs font-medium text-ink hover:border-danger hover:text-danger">
                      <XIcon className="h-3.5 w-3.5" aria-hidden="true" /> Rechazar
                    </button>
                    <button type="button" onClick={() => decide(r.id, 'aprobada')} className="inline-flex h-8 items-center gap-1.5 rounded bg-accent px-3 text-xs font-medium text-white hover:bg-accent-hover">
                      <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Aprobar
                    </button>
                  </> :

            <RequestStatusBadge status={r.status} />
            }
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}