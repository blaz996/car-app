import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { VeichleProvider } from './common/context/VeichleContext';

import { AppRoutes } from './pages/AppRoutes';

import './common/style/style.scss';
function App() {
  return (
    <VeichleProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </VeichleProvider>
  );
}

export default App;
