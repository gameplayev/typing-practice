import './App.scss';
import { useState } from 'react';
import { Routes, Route, Link, Navigate} from 'react-router-dom';
import Main from './pages/main';
import setting from "./pages/setting";

const App= () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to = "/main" replace/>} />
        <Route path='/main' element={<Main/>} />
        <Route path='/setting' element = {<setting/>} />
      </Routes>
    </div>
  );
}

export default App;
