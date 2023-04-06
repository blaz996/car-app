import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRootStore } from './common/hooks/useRootStore';
import { AppRoutes } from './common/routes/AppRoutes';

import './common/style/style.scss';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
