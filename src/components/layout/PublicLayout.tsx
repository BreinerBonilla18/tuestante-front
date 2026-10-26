import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PublicPageMotion } from './PublicPageMotion';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function PublicLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-white">
        
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <PublicPageMotion key={location.pathname} revealSections={location.pathname !== '/'}>
          <Outlet />
        </PublicPageMotion>
      </main>
      <SiteFooter />
    </div>);

}