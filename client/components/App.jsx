import React from 'react';
import LoginForm from './LoginForm.jsx';
import MainPage from './MainPage.jsx';
import Dashboard from './Dashboard.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;