import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SummeryCalc from './pages/SummeryCalc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<SummeryCalc />} />
      </Routes>



    </>
  )
}

export default App