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
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm.jsx';
import Signup from './components/Signup.jsx';
import MainPage from './components/MainPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddShow from './components/AddShow.jsx';
import Show from './components/Show.jsx'
import Comment from './components/Comment.jsx'
//to include bootstrap styling uncomment this line:
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LoginForm /> },
      { path: '/mainpage', element: <MainPage /> },
      { path: '/signup', element: <Signup /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/addshow', element: <AddShow /> },
      { path: '/show', element: <Show /> },
      { path: '/comments', element: <Comment /> },
    ],
  },
]);




const container = document.getElementById('app');
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// client/main.js