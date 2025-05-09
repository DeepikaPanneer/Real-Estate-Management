import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">{property.type} - {property.location}</h3>
      <p className="mb-2">{property.description}</p>
      <p>Bedrooms: {property.bedrooms || "N/A"}</p>
      <p>Price: ${property.price}</p>
      <p>Available: {property.available ? "Yes" : "No"}</p>
      <Link
        to={`/book/${property.id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </Link>
    </div>
  );
}

export default PropertyCard;
