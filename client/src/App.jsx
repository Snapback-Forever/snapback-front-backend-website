import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast"

import LandingPage from './pages/LandingPage';
import Footer from './pages/Footer';
import PublicRoute from './routes/PublicRoute';
import AdminRoute from './routes/AdminRoute';
import MsgForm from './components/MsgForm';
import Questions from './components/Questions';
import AdminLandingPage from './pages/AdminLandingPage';
import Memes from './components/Memes';
import AllMemes from './components/AdminComponents/AllMemes';

function App() {




  return (
    <>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/msgForm" element={<MsgForm />} />
          <Route path="/quest" element={<Questions />} />
          <Route path="/memes" element={<Memes />} />
          <Route path="/allMemes" element={<AllMemes />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/adminLanding" element={<AdminLandingPage />} />
        </Route>

      </Routes>

      <Footer />

      <Toaster />
    </>
  )
}

export default App
