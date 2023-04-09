import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CacheProvider value={muiCache}>
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeProvider theme={createTheme()}>
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
          </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  </CacheProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
