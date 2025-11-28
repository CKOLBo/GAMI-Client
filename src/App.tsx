import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login/LoginPage';
import Step3 from '@/pages/signup/signup3/SignupStep3';
import Step1 from '@/pages/signup/signup1/SignupStep1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup1" element={<Step1 />} />
        <Route path="/signup3" element={<Step3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
