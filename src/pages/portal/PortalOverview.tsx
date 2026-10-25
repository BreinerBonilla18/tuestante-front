import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { MaskedValue, RevealToggle } from '../../components/portal/MaskedValue';
import { RequestStatusBadge } from '../../components/portal/RequestStatusBadge';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { lockOptions } from '../../data/configOptions';
import { payrollCredits } from '../../data/payrollCredits';
import { summarizeCredit } from '../../utils/credit';
import { formatUsd } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

export function PortalOverview() {
  const { user, requests, lockers } = usePortalSession();
  const [revealed, setRevealed] = useState(false);
  if (!user) return null;

  const credit = summarizeCredit(user, payrollCredits);
  const usedPct = Math.min(100, credit.used / credit.limit * 100);
  const myLocker = lockers.find((l) => l.id === user.lockerId);
  const myRequests = requests.filter((r) => r.employeeId === user.employeeId).slice(0, 4);
  const pending = requests.filter((r) => r.status === 'pendiente' && r.employeeId !== user.employeeId);
  const canApprove = user.role !== 'empleado';

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Hola, {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-sm text-muted">
            {user.position} · {user.department} · {user.employeeId}
          </p>
        </div>
        <RevealToggle revealed={revealed} onToggle={() => setRevealed((v) => !v)} />
      </div>

      {canApprove && pending.length > 0 &&
      <Link to="/portal/aprobaciones" className="mt-8 flex items-center justify-between gap-4 rounded bg-accent-soft px-5 py-4 text-sm transition-colors duration-150 hover:bg-[#DCE7F3]">
          <span className="text-ink">
            Tiene <span className="font-semibold tabular-nums">{pending.length}</span> solicitudes del equipo esperando su aprobación.
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-accent">
            Revisar <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      }

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="border border-line p-6 md:p-8 lg:col-span-2" aria-labelledby="credit-title">
          <h2 id="credit-title" className="text-sm text-muted">Crédito de nómina disponible</h2>
          <MaskedValue value={formatUsd(credit.available)} revealed={revealed} className="mt-2 block text-4xl font-semibold text-ink md:text-5xl" />
          <div className="mt-6 h-1.5 w-full bg-surface" role="progressbar" aria-valuenow={Math.round(usedPct)} aria-valuemin={0} aria-valuemax={100} aria-label="Crédito utilizado">
            <div className="h-full bg-accent" style={{ width: `${usedPct}%` }} />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-xs text-muted">Utilizado</dt>
              <dd><MaskedValue value={formatUsd(credit.used)} revealed={revealed} className="text-ink" /></dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Límite</dt>
              <dd><MaskedValue value={formatUsd(credit.limit)} revealed={revealed} className="text-ink" /></dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Cuotas este mes</dt>
              <dd><MaskedValue value={formatUsd(credit.monthlyCommitted)} revealed={revealed} className="text-ink" /></dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/portal/catalogo" className="inline-flex h-10 items-center rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover">
              Ver catálogo interno
            </Link>
            <Link to="/portal/creditos" className="inline-flex h-10 items-center rounded border border-line px-4 text-sm font-medium text-ink hover:border-muted">
              Simular un crédito
            </Link>
          </div>
        </section>

        <section className="bg-surface p-6" aria-labelledby="locker-title">
          <h2 id="locker-title" className="text-sm text-muted">Mi locker</h2>
          {myLocker ?
          <>
              <p className="mt-2 text-4xl font-semibold tabular-nums text-ink">{myLocker.id}</p>
              <p className="mt-2 text-sm text-ink">{myLocker.location}</p>
              <p className="text-sm text-muted">Banco {myLocker.bank} · Cerradura {lockOptions.find((l) => l.id === myLocker.type)?.label}</p>
            </> :

          <p className="mt-2 text-sm text-muted">No tiene un locker asignado.</p>
          }
          <Link to="/portal/locker" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            {user.role === 'admin' ? 'Gestionar lockers' : 'Ver detalle'} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <section className="mt-12" aria-labelledby="recent-title">
        <div className="flex items-baseline justify-between">
          <h2 id="recent-title" className="text-base font-semibold text-ink">Mis solicitudes recientes</h2>
          <Link to="/portal/solicitudes" className="text-sm text-accent hover:underline">Ver todas</Link>
        </div>
        {myRequests.length === 0 ?
        <p className="mt-4 border-t border-line py-8 text-sm text-muted">Aún no ha registrado solicitudes.</p> :

        <ul className="mt-4 divide-y divide-line border-y border-line">
            {myRequests.map((r) =>
          <li key={r.id} className="flex flex-wrap items-center gap-x-6 gap-y-1 py-4">
                <span className="w-20 text-xs tabular-nums text-muted">{r.id}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">{r.title}</p>
                  <p className="truncate text-xs text-muted">{r.detail}</p>
                </div>
                <span className="text-xs text-muted">{formatDate(r.createdAt)}</span>
                <RequestStatusBadge status={r.status} />
              </li>
          )}
          </ul>
        }
      </section>
    </div>);

}