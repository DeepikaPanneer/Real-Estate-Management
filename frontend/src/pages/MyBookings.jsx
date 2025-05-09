import { useEffect, useState } from "react";
import api from "../services/api";
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/api/bookings/renter");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    await api.delete(`/api/bookings/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div className="bookings-page">
      <div className="bookings-container">
        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <h3>
                  {booking.property
                    ? `${booking.property.type} - Property ID: ${booking.propertyId}`
                    : `Property ID: ${booking.propertyId}`}
                </h3>
                <p><strong>Rental Period:</strong> {booking.startDate} to {booking.endDate}</p>
                <p><strong>Payment:</strong> ****{booking.creditCard?.cardNumber?.slice(-4)}</p>
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

export default MyBookings;
