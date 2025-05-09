import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './Dashboard.css';

function RenterDashboard({ onLogout }) {
  const [addresses, setAddresses] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [cardData, setCardData] = useState({ cardNumber: "", billingAddress: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
    fetchCreditCards();
    fetchRewards();
  }, []);

  const fetchAddresses = async () => {
    const res = await api.get("/api/addresses");
    setAddresses(res.data);
  };

  const fetchCreditCards = async () => {
    const res = await api.get("/api/creditcards");
    setCreditCards(res.data);
  };

  const fetchRewards = async () => {
    try {
      const res = await api.get("/api/rewards");
      setRewardPoints(res.data.points);
    } catch (err) {
      console.error("Error fetching rewards", err);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    await api.post("/api/addresses", { address: newAddress });
    setNewAddress("");
    fetchAddresses();
  };

  const addCreditCard = async (e) => {
    e.preventDefault();
    await api.post("/api/creditcards", cardData);
    setCardData({ cardNumber: "", billingAddress: "" });
    fetchCreditCards();
  };

  const deleteCreditCard = async (id) => {
    await api.delete(`/api/creditcards/${id}`);
    fetchCreditCards();
  };

  const deleteAddress = async (id) => {
    await api.delete(`/api/addresses/${id}`);
    fetchAddresses();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Renter Dashboard</h2>

        {/* 🎁 Reward Points Display */}
        <div className="reward-points">
          <h3>🎁 Reward Points: {rewardPoints}</h3>
        </div>

        <div className="dashboard-buttons">
          <button onClick={() => navigate("/search")} className="blue-button">
            Search Properties
          </button>
          <button onClick={() => navigate("/my-bookings")} className="green-button">
            My Bookings
          </button>
          <button onClick={onLogout} className="red-button">
            Logout
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Manage Addresses</h3>

          <form onSubmit={addAddress} className="dashboard-form">
            <input
              type="text"
              placeholder="Enter Address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
            />
            <button type="submit">Save Address</button>
          </form>

          {addresses.map((addr) => (
            <div key={addr.id} className="dashboard-item">
              {addr.address}
              <button onClick={() => deleteAddress(addr.id)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <h3>Manage Credit Cards</h3>

          <form onSubmit={addCreditCard} className="dashboard-form">
            <input
              type="text"
              placeholder="Card Number"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Billing Address"
              value={cardData.billingAddress}
              onChange={(e) => setCardData({ ...cardData, billingAddress: e.target.value })}
              required
            />
            <button type="submit">Save Card</button>
          </form>

          {creditCards.map((card) => (
            <div key={card.id} className="dashboard-item">
              **** **** **** {card.cardNumber.slice(-4)}
              <button onClick={() => deleteCreditCard(card.id)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenterDashboard;
