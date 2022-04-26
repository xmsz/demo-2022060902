import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import BasicLayout from '@/layouts/Basic';
import App from '@/App';
import Store from '@/stores';
import '@/index.css';
import '@/modal.css';
import 'uno.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BasicLayout>
        <App />
      </BasicLayout>
    </Provider>
  </React.StrictMode>
);
