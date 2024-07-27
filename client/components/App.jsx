import React from 'react';
import LoginForm from './LoginForm.jsx';
import MainPage from './MainPage.jsx';
import Dashboard from './Dashboard.jsx';
import AddShow from './AddShow.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/addshow' element={<AddShow />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;