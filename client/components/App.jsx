import React from 'react';
import LoginForm from './LoginForm.jsx';
import MainPage from './MainPage.jsx';
import ShowSelection from './ShowSelection.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/mainpage' element={<MainPage />} />
            <Route path='/shows' element={<ShowSelection />} />
          </Routes>
    </>
  )
}

export default App;