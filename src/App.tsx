import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppProvider } from './AppContext'
import LandingPage from './components/LandingPage'
import VenueDetails from './components/VenueDetails'

function App() {
  return (
    <Router>
      <AppProvider>
      <div className='App'>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/places/:fsq_id" element={<VenueDetails />} />
        </Routes>
        </div>
        </AppProvider>
    </Router>
  );
}

export default App;
