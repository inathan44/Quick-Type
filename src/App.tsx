import { Routes, Route } from 'react-router-dom';
import './index.css';
import InputForm from './components/InputForm';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Results from './components/Results';
import NewTestButton from './components/NewTestButton';

function App() {
  return (
    <div className="max-w-7xl mx-auto text-gray-300">
      <NavBar />
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="/" element={<InputForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <NewTestButton />
    </div>
  );
}

export default App;
