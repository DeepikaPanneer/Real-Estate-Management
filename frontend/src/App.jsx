import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import RenterDashboard from './pages/RenterDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AddProperty from './pages/AddProperty';
import SearchProperties from './pages/SearchProperties';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import AgentBookings from './pages/AgentBookings';
import Rewards from './pages/Rewards';
import Neighborhoods from './pages/Neighborhoods';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Renter Routes */}
        {user && user.type === 'renter' && (
          <>
            <Route path="/dashboard/renter" element={<RenterDashboard onLogout={handleLogout} />} />
            <Route path="/search" element={<SearchProperties />} />
            <Route path="/book/:propertyId" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/rewards" element={<Rewards />} />
          </>
        )}

        {/* Agent Routes */}
        {user && user.type === 'agent' && (
          <>
            <Route path="/dashboard/agent" element={<AgentDashboard onLogout={handleLogout} />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/agent-bookings" element={<AgentBookings />} />
            <Route path="/neighborhoods" element={<Neighborhoods />} />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? `/dashboard/${user.type}` : '/login'} />} />

      </Routes>
    </Router>
  );
}

export default App;
