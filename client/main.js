import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => { 
  const root = createRoot(document.querySelector('#root'))
  root.render(
    <Router>
      <App />
    </Router>
  );
})