import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CheckSquareIcon,
  InboxIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  ShieldCheckIcon,
  TagIcon,
  WalletIcon,
  XIcon } from
'lucide-react';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { roleLabels } from '../../data/portalUsers';
import type { Role } from '../../types/portal';
import { Logo } from '../Logo';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{className?: string;}>;
  roles: Role[];
  end?: boolean;
  badge?: number;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function PortalLayout() {
  const { user, logout, requests } = usePortalSession();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  if (!user) return <Navigate to="/portal/login" replace />;

  const pendingApprovals = requests.filter((r) => r.status === 'pendiente' && r.employeeId !== user.employeeId).length;
  const all: Role[] = ['empleado', 'supervisor', 'admin'];
  const allItems: NavItem[] = [
  { to: '/portal', label: 'Resumen', icon: LayoutDashboardIcon, roles: all, end: true },
  { to: '/portal/catalogo', label: 'Catálogo interno', icon: TagIcon, roles: all },
  { to: '/portal/creditos', label: 'Créditos de nómina', icon: WalletIcon, roles: all },
  { to: '/portal/locker', label: user.role === 'admin' ? 'Asignación de lockers' : 'Mi locker', icon: KeyRoundIcon, roles: all },
  { to: '/portal/solicitudes', label: 'Mis solicitudes', icon: InboxIcon, roles: all },
  { to: '/portal/aprobaciones', label: 'Aprobaciones', icon: CheckSquareIcon, roles: ['supervisor', 'admin'], badge: pendingApprovals }];

  const items = allItems.filter((i) => i.roles.includes(user.role));

  const sidebar =
  <div className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-5">
        <Logo to="/portal" />
        <p className="mt-1.5 pl-[34px] text-xs text-muted">Portal de empleados</p>
      </div>
      <nav aria-label="Portal" className="flex-1 px-3">
        <ul className="space-y-0.5">
          {items.map((item) =>
        <li key={item.to}>
              <NavLink
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
            `flex h-10 items-center gap-3 rounded px-3 text-sm transition-colors duration-150 ${
            isActive ? 'bg-white font-medium text-ink shadow-[0_0_0_1px_#D9DEE5]' : 'text-muted hover:bg-white/70 hover:text-ink'}`

            }>
            
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge ?
            <span className="rounded-sm bg-accent px-1.5 text-[11px] font-semibold tabular-nums text-white">{item.badge}</span> :
            null}
              </NavLink>
            </li>
        )}
        </ul>
      </nav>
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{user.name}</p>
            <p className="flex items-center gap-1 text-xs text-muted">
              <ShieldCheckIcon className="h-3 w-3" aria-hidden="true" />
              {roleLabels[user.role]}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link to="/" className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded border border-line bg-white text-xs text-ink hover:border-muted">
            <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Sitio público
          </Link>
          <button type="button" onClick={logout} className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded border border-line bg-white text-xs text-ink hover:border-danger hover:text-danger">
            <LogOutIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Salir
          </button>
        </div>
      </div>
    </div>;


  return (
    <div className="flex min-h-screen w-full bg-white">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-line bg-surface lg:block">{sidebar}</aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center justify-between border-b border-line px-4 lg:hidden">
          <Logo to="/portal" />
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" className="p-2">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
        <main className="mx-auto w-full max-w-[1120px] flex-1 px-4 py-8 md:px-10 md:py-10">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {menuOpen &&
        <>
            <motion.div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease }} onClick={() => setMenuOpen(false)} />
            <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú del portal"
            className="fixed inset-y-0 left-0 z-50 w-72 bg-surface lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.26, ease }}>
            
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="absolute right-3 top-4 p-2">
                <XIcon className="h-5 w-5" />
              </button>
              {sidebar}
            </motion.aside>
          </>
        }
      </AnimatePresence>
    </div>);

}