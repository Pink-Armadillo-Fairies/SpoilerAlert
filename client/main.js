import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ShowSelection from './components/ShowSelection.jsx';
// import Dashboard from './components/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import Signup from './components/Signup.jsx';
import MainPage from './components/MainPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddShow from './components/AddShow.jsx';
import Show from './components/Show.jsx'

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
    {path: '/signup',
      element: <Signup/>,
      children: [],
     },
     {path: '/dashboard',
     element: <Dashboard/>,
     children: [],
    },
    {path: '/addshow',
      element: <AddShow/>,
      children: [],
    },
    {path: '/show',
      element: <Show/>,
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
