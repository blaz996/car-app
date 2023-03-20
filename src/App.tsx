import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './pages/AppRoutes';

import { Radio } from './components/Form/Radio';

import './common/style/style.scss';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
