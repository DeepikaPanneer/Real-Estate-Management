import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // 👈 Added Link
import './Login.css';
import api from '../services/api';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", formData);
      onLogin(res.data);
      navigate(`/dashboard/${res.data.type}`);
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* 👇 ADD this below form */}
        <p className="register-link">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
