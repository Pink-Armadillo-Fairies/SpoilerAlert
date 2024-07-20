import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShowSelection from './components/ShowSelection.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainPage from './components/MainPage.jsx';

//to include bootstrap styling uncomment this line:
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter(
  [
    {path: '/',
     element: <LoginForm />,
     children: [],
    }, 
    {path: '/mainpage',
     element: <MainPage/>,
     children: [],
    }, 
  ])




const container = document.getElementById('app');
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
