import { useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import './SearchProperties.css';

function SearchProperties() {
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    type: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = {
      location: filters.location,
      date: filters.date,
      type: filters.type,
      bedrooms: filters.bedrooms,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
    };
    const res = await api.get("/api/properties/search", { params });
    setResults(res.data);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h2>Search Properties</h2>

        <form onSubmit={handleSearch} className="search-form">
          <input
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
            required
          />
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Any Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="commercial">Commercial Building</option>
          </select>
          <input
            name="bedrooms"
            type="number"
            placeholder="Max Bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          />
          <input
            name="minPrice"
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
          />
          <select name="sort" value={filters.sort} onChange={handleChange}>
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="bedrooms">Bedrooms</option>
          </select>

          <button type="submit">Search</button>
        </form>

        <div className="property-results">
          {results.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchProperties;
