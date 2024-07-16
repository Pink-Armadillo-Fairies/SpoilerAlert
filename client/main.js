import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShowSelection from './components/ShowSelection.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainPage from './components/MainPage.jsx';


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
  <RouterProvider router={router} />
);
