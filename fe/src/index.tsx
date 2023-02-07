import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'material-react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'material-react-toastify/dist/ReactToastify.css';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <CacheProvider value={muiCache}>
    <React.StrictMode>
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
    </React.StrictMode>
  </CacheProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
