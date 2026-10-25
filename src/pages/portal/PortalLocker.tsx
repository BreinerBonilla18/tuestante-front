import React, { useState } from 'react';
import { toast } from 'sonner';
import { LockerBank } from '../../components/portal/LockerBank';
import { MaskedValue, RevealToggle } from '../../components/portal/MaskedValue';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { lockOptions } from '../../data/configOptions';
import { employeeDirectory, portalUsers } from '../../data/portalUsers';
import type { Locker } from '../../types/portal';

export function PortalLocker() {
  const { user } = usePortalSession();
  if (!user) return null;
  return user.role === 'admin' ? <LockerAdmin /> : <MyLocker />;
}

function MyLocker() {
  const { user, lockers, addRequest } = usePortalSession();
  const [revealed, setRevealed] = useState(false);
  if (!user) return null;
  const locker = lockers.find((l) => l.id === user.lockerId);

  const request = (title: string, detail: string) => {
    addRequest({ type: 'locker', title, detail, amountUsd: null });
    toast.success('Solicitud registrada', { description: title });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Mi locker</h1>
          <p className="mt-1 text-sm text-muted">Asignación corporativa vigente.</p>
        </div>
        <RevealToggle revealed={revealed} onToggle={() => setRevealed((v) => !v)} />
      </div>

      {!locker ?
      <div className="mt-10 border-t border-line pt-10">
          <p className="text-ink">No tiene un locker asignado.</p>
          <button type="button" onClick={() => request('Solicitud de locker', 'Primera asignación')} className="mt-4 h-10 rounded bg-accent px-4 text-sm font-medium text-white">
            Solicitar locker
          </button>
        </div> :

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-5" aria-labelledby="locker-id">
            <p className="text-sm text-muted">Locker asignado</p>
            <p id="locker-id" className="mt-1 text-6xl font-semibold tabular-nums tracking-tight text-ink">{locker.id}</p>
            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <Row label="Ubicación" value={locker.location} />
              <Row label="Banco" value={`Banco ${locker.bank}`} />
              <Row label="Cerradura" value={lockOptions.find((l) => l.id === locker.type)?.label ?? ''} />
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{locker.type === 'rfid' ? 'UID de credencial' : 'Código de acceso'}</dt>
                <dd><MaskedValue value={locker.type === 'rfid' ? user.cardUid : '4 8 1 9'} revealed={revealed} className="font-mono text-ink" /></dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => request('Cambio de locker', `Desde ${locker.id}`)} className="h-10 rounded border border-line px-4 text-sm font-medium text-ink hover:border-muted">
                Solicitar cambio
              </button>
              <button type="button" onClick={() => request('Incidencia en locker', `${locker.id} · revisión de cerradura`)} className="h-10 rounded border border-line px-4 text-sm font-medium text-ink hover:border-muted">
                Reportar incidencia
              </button>
            </div>
          </section>
          <section className="lg:col-span-7" aria-labelledby="bank-title">
            <h2 id="bank-title" className="mb-3 text-sm text-muted">Banco {locker.bank} · su locker resaltado</h2>
            <LockerBank lockers={lockers.filter((l) => l.bank === locker.bank)} highlightId={locker.id} />
          </section>
        </div>
      }
    </div>);

}

function LockerAdmin() {
  const { lockers, updateLocker } = usePortalSession();
  const [bank, setBank] = useState<'A' | 'B'>('A');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [assignee, setAssignee] = useState('');
  const bankLockers = lockers.filter((l) => l.bank === bank);
  const selected = lockers.find((l) => l.id === selectedId) ?? null;
  const assignedNames = new Set(lockers.map((l) => l.assigneeName).filter(Boolean));
  const candidates = [...portalUsers.map((u) => u.name), ...employeeDirectory].filter((n) => !assignedNames.has(n));
  const counts = {
    asignado: bankLockers.filter((l) => l.status === 'asignado').length,
    libre: bankLockers.filter((l) => l.status === 'libre').length,
    mantenimiento: bankLockers.filter((l) => l.status === 'mantenimiento').length
  };

  const select = (l: Locker) => {
    setSelectedId(l.id);
    setAssignee('');
  };

  const act = (assigneeName: string | null, status: Locker['status'], message: string) => {
    if (!selected) return;
    updateLocker(selected.id, assigneeName, status);
    toast.success(message, { description: `Locker ${selected.id}` });
    setAssignee('');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Asignación de lockers</h1>
      <p className="mt-1 text-sm text-muted">Sede Caracas · seleccione un locker para asignarlo, liberarlo o enviarlo a mantenimiento.</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line">
        <div className="flex gap-6 text-sm" role="tablist">
          {(['A', 'B'] as const).map((b) =>
          <button key={b} type="button" role="tab" aria-selected={bank === b} onClick={() => {setBank(b);setSelectedId(null);}} className={`-mb-px border-b-2 pb-3 ${bank === b ? 'border-accent font-medium text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              Banco {b} · {b === 'A' ? 'Piso 1 · RFID' : 'Piso 2 · Digital'}
            </button>
          )}
        </div>
        <p className="pb-3 text-xs tabular-nums text-muted">
          {counts.asignado} asignados · {counts.libre} libres · {counts.mantenimiento} en mantenimiento
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <LockerBank lockers={bankLockers} selectedId={selectedId} onSelect={select} />
        </div>
        <aside className="lg:col-span-4" aria-live="polite">
          {!selected ?
          <p className="border-t border-line pt-6 text-sm text-muted">Seleccione un locker del banco para ver sus detalles.</p> :

          <div className="border-t border-line pt-6">
              <p className="text-4xl font-semibold tabular-nums text-ink">{selected.id}</p>
              <p className="mt-1 text-sm text-muted">{selected.location} · {lockOptions.find((l) => l.id === selected.type)?.label}</p>
              <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                <Row label="Estado" value={selected.status === 'asignado' ? 'Asignado' : selected.status === 'libre' ? 'Libre' : 'En mantenimiento'} />
                <Row label="Asignado a" value={selected.assigneeName ?? '—'} />
              </dl>

              {selected.status === 'libre' &&
            <div className="mt-6">
                  <label htmlFor="assignee" className="mb-1.5 block text-sm font-medium text-ink">Asignar a</label>
                  <select id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} className="h-10 w-full rounded border border-line bg-white px-3 text-sm focus:border-accent focus:outline-none">
                    <option value="">Seleccione un empleado…</option>
                    {candidates.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <button type="button" disabled={!assignee} onClick={() => act(assignee, 'asignado', `Asignado a ${assignee}`)} className="mt-3 h-10 w-full rounded bg-accent text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50">
                    Asignar locker
                  </button>
                </div>
            }
              <div className="mt-4 flex flex-col gap-2">
                {selected.status === 'asignado' &&
              <button type="button" onClick={() => act(null, 'libre', 'Locker liberado')} className="h-10 rounded border border-line text-sm font-medium text-ink hover:border-muted">
                    Liberar locker
                  </button>
              }
                {selected.status !== 'mantenimiento' ?
              <button type="button" onClick={() => act(null, 'mantenimiento', 'Enviado a mantenimiento')} className="h-10 rounded border border-line text-sm font-medium text-ink hover:border-warning hover:text-warning">
                    Enviar a mantenimiento
                  </button> :

              <button type="button" onClick={() => act(null, 'libre', 'Locker habilitado')} className="h-10 rounded border border-line text-sm font-medium text-ink hover:border-success hover:text-success">
                    Marcar como disponible
                  </button>
              }
              </div>
            </div>
          }
        </aside>
      </div>
    </div>);

}

function Row({ label, value }: {label: string;value: string;}) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>);

}