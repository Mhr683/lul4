/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { StorefrontView } from './components/StorefrontView';
import { AdminDashboardView } from './components/AdminDashboardView';

const MainRouter: React.FC = () => {
  const [mode, setMode] = useState<'STOREFRONT' | 'ADMIN'>('STOREFRONT');
  const [adminInitialTab, setAdminInitialTab] = useState<string | undefined>('PRODUCTS');
  const [autoOpenNewProduct, setAutoOpenNewProduct] = useState(false);
  const { toastMessage } = useStore();

  return (
    <div className="relative min-h-screen">
      {mode === 'STOREFRONT' ? (
        <StorefrontView
          onOpenAdmin={(tab?: string, openNewProduct?: boolean) => {
            setAdminInitialTab(tab || 'PRODUCTS');
            setAutoOpenNewProduct(Boolean(openNewProduct));
            setMode('ADMIN');
          }}
        />
      ) : (
        <AdminDashboardView
          initialTab={adminInitialTab as any}
          autoOpenNewProduct={autoOpenNewProduct}
          onReturnToStore={() => {
            setMode('STOREFRONT');
            setAutoOpenNewProduct(false);
          }}
        />
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-5 py-3 bg-[#141413] text-[#FBFBF9] border border-white/15 text-xs font-medium shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
