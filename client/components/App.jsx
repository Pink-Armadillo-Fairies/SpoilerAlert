import React from 'react';
import LoginForm from './LoginForm.jsx';
import ShowSelection from './ShowSelection.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
          <h1>Spoiler Alert!</h1>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/shows' element={<ShowSelection />} />
          </Routes>
    </>
  )
}

export default App;