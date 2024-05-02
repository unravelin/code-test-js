import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import VenueDetails from './components/VenueDetails'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/venue/:fsq_id" element={<VenueDetails />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
