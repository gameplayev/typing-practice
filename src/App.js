import './App.scss';
import { Routes, Route, Navigate} from 'react-router-dom';
import Main from './pages/main.js';


const App= () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to = "/main" replace/>} />
        <Route path='/main' element= {<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
