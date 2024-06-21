import React from 'react'
import GetMsisdn from './pages/GetMsisdn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Redirect from './pages/Redirect';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetMsisdn />} />
          
          <Route path='/redirect' element={<Redirect />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
