import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import './BookingPage.css';

function BookingPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    fetchProperty();
    fetchCreditCards();
  }, []);

  const fetchProperty = async () => {
    const res = await api.get(`/api/properties/${propertyId}`);
    setProperty(res.data);
  };

  const fetchCreditCards = async () => {
    const res = await api.get("/api/creditcards");
    setCreditCards(res.data);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    await api.post("/api/bookings", {
      propertyId,
      startDate,
      endDate,
      creditCardId: paymentMethod,
    });
    alert("Booking Confirmed!");
    navigate("/my-bookings");
  };

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Book Property</h2>

        <div className="booking-property">
          <h3>{property.type} - {property.location}</h3>
          <p>{property.description}</p>
          <p><strong>Price:</strong> ${property.price}</p>
        </div>

        <form onSubmit={handleBooking} className="booking-form">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            {creditCards.map((card) => (
              <option key={card.id} value={card.id}>
                **** **** **** {card.cardNumber.slice(-4)}
              </option>
            ))}
          </select>

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
