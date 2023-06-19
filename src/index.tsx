import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppWrapper } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);