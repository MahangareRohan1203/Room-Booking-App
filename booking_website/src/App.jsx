import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login'; // you'll create this next
import Bookings from './pages/Bookings'; // placeholder
import NewBooking from './pages/NewBooking'; // placeholder

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/bookings/new" element={<NewBooking />} />
    </Routes>
  );
};

export default App;
