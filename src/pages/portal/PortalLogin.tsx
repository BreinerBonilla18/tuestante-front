import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircleIcon, ArrowLeftIcon, Loader2Icon, LockIcon } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { portalUsers, roleLabels } from '../../data/portalUsers';

export function PortalLogin() {
  const { user, login } = usePortalSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/portal" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Ingrese su correo corporativo y su contraseña.');
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) navigate('/portal');else
      setError('Correo o contraseña incorrectos. Después de 5 intentos la cuenta se bloquea por 15 minutos.');
    }, 700);
  };

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 md:px-14">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Volver al sitio
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Portal de empleados</h1>
          <p className="mt-2 text-muted">Acceda con su correo corporativo.</p>

          {error &&
          <div role="alert" className="mt-6 flex gap-3 rounded bg-danger-soft px-4 py-3 text-sm text-danger">
              <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          }

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Correo corporativo</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-11 w-full rounded border px-3 text-sm focus:outline-none focus:ring-2 ${error ? 'border-danger focus:ring-danger/20' : 'border-line focus:border-accent focus:ring-accent/20'}`} />
              
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between">
                <label htmlFor="password" className="text-sm font-medium text-ink">Contraseña</label>
                <span className="text-xs text-muted">¿Olvidó su contraseña? Contacte a RRHH</span>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-11 w-full rounded border px-3 text-sm focus:outline-none focus:ring-2 ${error ? 'border-danger focus:ring-danger/20' : 'border-line focus:border-accent focus:ring-accent/20'}`} />
              
            </div>
            <button type="submit" disabled={loading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-accent text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover disabled:opacity-80">
              {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {loading ? 'Verificando…' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-medium text-muted">Cuentas de demostración · contraseña demo1234</p>
            <ul className="mt-3 space-y-1">
              {portalUsers.map((u) =>
              <li key={u.id}>
                  <button
                  type="button"
                  onClick={() => {setEmail(u.email);setPassword(u.password);setError(null);}}
                  className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm hover:bg-surface">
                  
                    <span className="text-ink">{u.name}</span>
                    <span className="text-xs text-muted">{roleLabels[u.role]}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden flex-col justify-end bg-surface p-14 lg:flex">
        <div className="max-w-md">
          <LockIcon className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Su información de nómina está protegida.</h2>
          <p className="mt-3 leading-relaxed text-muted">
            El acceso se otorga por rol. Los montos de salario y crédito permanecen ocultos hasta que usted decida mostrarlos, y cada consulta queda registrada.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-muted">Empleados</dt>
              <dd className="mt-1 text-ink">Precios internos, créditos y su locker</dd>
            </div>
            <div>
              <dt className="text-muted">Supervisores y RRHH</dt>
              <dd className="mt-1 text-ink">Aprobaciones y asignación de lockers</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>);

}