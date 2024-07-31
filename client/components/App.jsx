import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

const App = () => {
  return (
    <>
      <Header title='Spoiler Alert!' />
      <Outlet />
    </>
  )
}

export default App;