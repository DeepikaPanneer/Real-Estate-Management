import { useState, useEffect } from "react";
import api from "../services/api";
import './AddProperty.css';

function AddProperty() {
  const [formData, setFormData] = useState({
    type: "apartment",
    location: "",
    description: "",
    price: "",
    bedrooms: "",
    squareFootage: "",
    available: true,
    neighborhoodId: ""
  });

  const [neighborhoods, setNeighborhoods] = useState([]);

  // Fetch neighborhoods from backend on component load
  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const fetchNeighborhoods = async () => {
    try {
      const res = await api.get("/api/neighborhoods");
      setNeighborhoods(res.data);
    } catch (err) {
      console.error("Error fetching neighborhoods:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send to backend
    await api.post("/api/properties", formData);
    alert("Property added!");

    // Reset form
    setFormData({
      type: "apartment",
      location: "",
      description: "",
      price: "",
      bedrooms: "",
      squareFootage: "",
      available: true,
      neighborhoodId: ""
    });
  };

  return (
    <div className="add-property-page">
      <div className="add-property-container">
        <h2>Add Property</h2>

        <form onSubmit={handleSubmit} className="add-property-form">

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="commercial">Commercial Building</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="bedrooms"
            type="number"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />

          <input
            name="squareFootage"
            type="number"
            placeholder="Square Footage"
            value={formData.squareFootage}
            onChange={handleChange}
          />

          <select name="neighborhoodId" value={formData.neighborhoodId} onChange={handleChange}>
            <option value="">Select Neighborhood (optional)</option>
            {neighborhoods.length === 0 ? (
              <option disabled>Loading neighborhoods...</option>
            ) : (
              neighborhoods.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))
            )}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
