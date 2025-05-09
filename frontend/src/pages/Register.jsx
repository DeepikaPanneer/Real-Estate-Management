import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    type: "renter",
    budget: "",
    moveInDate: "",
    location: "",
    jobTitle: "",
    agency: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", formData);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="renter">Renter</option>
            <option value="agent">Agent</option>
          </select>

          {formData.type === "renter" && (
            <>
              <input
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
              />
              <input
                name="moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={handleChange}
              />
              <input
                name="location"
                placeholder="Preferred Location"
                value={formData.location}
                onChange={handleChange}
              />
            </>
          )}

          {formData.type === "agent" && (
            <>
              <input
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
              <input
                name="agency"
                placeholder="Agency"
                value={formData.agency}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
