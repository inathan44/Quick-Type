import { Routes, Route } from 'react-router-dom';
import './index.css';
import InputForm from './components/InputForm';
import Signup from './components/Signup';
import NavBar from './components/NavBar';

function App() {
  return (
    // <div className='text-white'>
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<InputForm />} />
      </Routes>
    </div>
    // </div>
  );
}

export default App;
