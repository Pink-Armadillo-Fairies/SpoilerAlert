import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
