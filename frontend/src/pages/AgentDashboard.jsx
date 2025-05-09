import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './Dashboard.css'; // Reuse the same Dashboard.css

function AgentDashboard({ onLogout }) {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await api.get("/api/properties/agent");
    setProperties(res.data);
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    await api.delete(`/api/properties/${id}`);
    fetchProperties();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Agent Dashboard</h2>

        <div className="dashboard-buttons">
          <button onClick={() => navigate("/add-property")} className="blue-button">
            Add Property
          </button>
          <button onClick={() => navigate("/agent-bookings")} className="green-button">
            View Bookings
          </button>
          <button onClick={onLogout} className="red-button">
            Logout
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Managed Properties</h3>
          {properties.length === 0 ? (
            <p>No properties listed yet.</p>
          ) : (
            properties.map((prop) => (
              <div key={prop.id} className="dashboard-item">
                {prop.type} - {prop.location}
                <button onClick={() => deleteProperty(prop.id)} className="delete-button">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
