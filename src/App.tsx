import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PublicLayout } from './components/layout/PublicLayout';
import { PortalLayout } from './components/portal/PortalLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { PortalSessionProvider } from './contexts/PortalSessionContext';
import { QuoteProvider } from './contexts/QuoteContext';
import { Catalog } from './pages/Catalog';
import { Configurator } from './pages/Configurator';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProductDetail } from './pages/ProductDetail';
import { Quote } from './pages/Quote';
import { QuoteProposal } from './pages/QuoteProposal';
import { TechnicalSheets } from './pages/TechnicalSheets';
import { PortalCatalog } from './pages/portal/PortalCatalog';
import { PortalCredits } from './pages/portal/PortalCredits';
import { PortalLocker } from './pages/portal/PortalLocker';
import { PortalLogin } from './pages/portal/PortalLogin';
import { PortalOverview } from './pages/portal/PortalOverview';
import { PortalRequests } from './pages/portal/PortalRequests';

export function App() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <QuoteProvider>
          <PortalSessionProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/catalogo/:ambiente" element={<Catalog />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
                <Route path="/configurador/:slug" element={<Configurator />} />
                <Route path="/cotizacion" element={<Quote />} />
                <Route path="/fichas-tecnicas" element={<TechnicalSheets />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/cotizacion/propuesta" element={<QuoteProposal />} />
              <Route path="/portal/login" element={<PortalLogin />} />
              <Route path="/portal" element={<PortalLayout />}>
                <Route index element={<PortalOverview />} />
                <Route path="catalogo" element={<PortalCatalog />} />
                <Route path="creditos" element={<PortalCredits />} />
                <Route path="locker" element={<PortalLocker />} />
                <Route path="solicitudes" element={<PortalRequests key="mine" mode="mine" />} />
                <Route path="aprobaciones" element={<PortalRequests key="approvals" mode="approvals" />} />
              </Route>
            </Routes>
            <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: 4, fontFamily: 'Inter, sans-serif' } }} />
          </PortalSessionProvider>
        </QuoteProvider>
      </CurrencyProvider>
    </BrowserRouter>);

}