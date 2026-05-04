import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import TextToVideo from './Pages/Text-to-Video'
import TextToAudio from './Pages/Text-to-Audio'
import Profile from './Pages/Profile'
import AccountSettings from './Pages/AccountSettings'
import CancelSubscription from './Pages/CancelSubscription'
import ChangePassword from './Pages/ChangePassword'
import Language from './Pages/Language'
import SignIn from './Pages/SignIn'
import WatermarkRemover from './Pages/WatermarkRemover'
import TextImage from './Pages/Text-to-Image'
import Copyright from './Pages/Copyright'
import Seoplanner from './Pages/Seoplanner'
import SignUp from './Pages/SignUp'
import PricingPage from './Pages/Pricingpage'
import SoraAI from './Pages/SoraAI.jsx'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-to-video" element={<TextToVideo />} />
        <Route path="/text-to-audio" element={<TextToAudio />} />
        <Route path="/seo-planner" element={<Seoplanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/settings" element={<AccountSettings />} />
        <Route path="/profile/cancel" element={<CancelSubscription />} />
        <Route path="/profile/password" element={<ChangePassword />} />
        <Route path="/profile/language" element={<Language />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/watermark-remover" element={<WatermarkRemover />} />
        <Route path="/text-to-image" element={<TextImage />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/sora-ai" element={<SoraAI />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  )
}



export default App
