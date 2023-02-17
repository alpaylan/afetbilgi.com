import './index.css';
import './i18n';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'material-react-toastify/dist/ReactToastify.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'material-react-toastify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

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
              position="top-center"
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop
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
