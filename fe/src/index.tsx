import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'material-react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'material-react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <CacheProvider value={muiCache}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={createTheme()}>
          <BrowserRouter>
            <App />
            <ToastContainer
              position='top-center'
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </CacheProvider>,
);
