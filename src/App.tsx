import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninPage from '@/pages/signin/SigninPage';
import Signup from '@/pages/signup/SignupPage';
import Main from '@/pages/main/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
