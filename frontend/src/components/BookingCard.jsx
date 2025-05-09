function BookingCard({ booking, onCancel }) {
    return (
      <div className="border p-4 rounded shadow-md mb-4">
        <h3 className="text-lg font-bold mb-2">{booking.property?.description}</h3>
        <p>Rental Period: {booking.startDate} to {booking.endDate}</p>
        <p>Total Cost: ${booking.totalCost}</p>
        <p>Status: {booking.status}</p>
        {booking.status === "active" && (
          <button
            onClick={() => onCancel(booking.id)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel Booking
          </button>
        )}
      </div>
    );
  }
  
  export default BookingCard;
  