import { useEffect, useState } from "react";
import api from "../services/api";
import './Neighborhoods.css';

function Neighborhoods() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    crimeRate: "",
    nearbySchools: "",
  });

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const fetchNeighborhoods = async () => {
    const res = await api.get("/api/neighborhoods");
    setNeighborhoods(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/neighborhoods", formData);
    fetchNeighborhoods();
    setFormData({ name: "", crimeRate: "", nearbySchools: "" });
  };

  return (
    <div className="neighborhoods-page">
      <div className="neighborhoods-container">
        <h2>Manage Neighborhoods</h2>

        <form onSubmit={handleSubmit} className="neighborhoods-form">
          <input
            name="name"
            placeholder="Neighborhood Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="crimeRate"
            placeholder="Crime Rate"
            value={formData.crimeRate}
            onChange={handleChange}
            required
          />
          <input
            name="nearbySchools"
            placeholder="Nearby Schools"
            value={formData.nearbySchools}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Neighborhood</button>
        </form>

        <div className="neighborhoods-list">
          {neighborhoods.map((n) => (
            <div key={n.id} className="neighborhood-card">
              <h3>{n.name}</h3>
              <p><strong>Crime Rate:</strong> {n.crimeRate}</p>
              <p><strong>Nearby Schools:</strong> {n.nearbySchools}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Neighborhoods;
