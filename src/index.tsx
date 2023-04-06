import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { RootStoreProvider } from './common/context/RootStoreContext';

import './common/style/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>
);
