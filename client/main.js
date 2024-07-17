import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './components/App.jsx';


const container = document.getElementById('app');
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
