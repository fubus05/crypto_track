import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrapper } from './app-wrapper';
import './index.css'
import { StyledEngineProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <AppWrapper />
      </StyledEngineProvider>
  </React.StrictMode>
);