import './App.scss';
import { useState } from 'react';
import { Routes, Route, Link, Navigate} from 'react-router-dom';
import Main from './pages/main.js';
import Setting from './pages/setting.js';

const App= () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to = "/main" replace/>} />
        <Route path='/main' element= {<Main/>} />
        <Route path='/setting' element= {<Setting/>} />
      </Routes>
    </div>
  );
}

export default App;
