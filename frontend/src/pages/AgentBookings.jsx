import { useEffect, useState } from "react";
import api from "../services/api";
import './AgentBookings.css';

function AgentBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAgentBookings();
  }, []);

  const fetchAgentBookings = async () => {
    const res = await api.get("/api/bookings/agent");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this renter's booking?")) return;
    await api.delete(`/api/bookings/${id}/cancel`);
    fetchAgentBookings();
  };

  return (
    <div className="agent-bookings-page">
      <div className="agent-bookings-container">
        <h2>Agent Bookings Overview</h2>

        {bookings.length === 0 ? (
          <p>No bookings for your properties yet.</p>
        ) : (
          <div className="agent-bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="agent-booking-card">
                
                <h3>
                  {booking.property
                    ? `${booking.property.type} - ${booking.property.location}`
                    : `Property ID: ${booking.propertyId}`}
                </h3>

                <p><strong>Renter:</strong> {booking.renter?.name || "N/A"}</p>
                <p><strong>Rental Period:</strong> {booking.startDate} to {booking.endDate}</p>
                <p><strong>Payment:</strong> ****{booking.creditCard?.cardNumber?.slice(-4) || "N/A"}</p>
                <p><strong>Status:</strong> {booking.status}</p>

                {booking.status === "active" && (
                  <button
                    className="cancel-button"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentBookings;
