import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Password from '@/pages/signup/password/PasswordPage';
import JoinPage from './pages/signup/join/JoinPage';
import EmailPage from './pages/signup/email/EmailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Password />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/email" element={<EmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
