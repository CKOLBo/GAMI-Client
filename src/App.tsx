import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from '@/pages/signin/SigninPage';
import Signup from '@/pages/signup/SignupPage';
import Post from '@/pages/post/PostPage';
import PostWrite from './pages/post/PostWrite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post-write" element={<PostWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
