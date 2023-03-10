import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import './index.css';
import './app.css';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
