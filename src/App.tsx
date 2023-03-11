import { Routes, Route } from 'react-router-dom';
import './index.css';
import InputForm from './components/InputForm';
import Signup from './components/Signup';

function App() {
  return (
    // <div className='text-white'>
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<InputForm />} />
    </Routes>
    // </div>
  );
}

export default App;
