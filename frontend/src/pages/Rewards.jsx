import { useEffect, useState } from "react";
import api from "../services/api";
import './Rewards.css';

function Rewards() {
  const [points, setPoints] = useState(0);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await api.get("/api/rewards");
      setPoints(res.data.points);
      setJoined(res.data.joined);
    } catch (err) {
      console.error("Error fetching rewards", err);
    } finally {
      setLoading(false);
    }
  };

  const joinRewards = async () => {
    try {
      await api.post("/api/rewards/join");
      fetchRewards();
    } catch (err) {
      console.error("Error joining rewards", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rewards-page">
      <h2>Rewards Program</h2>

      {joined ? (
        <p><strong>Your Reward Points:</strong> {points}</p>
      ) : (
        <>
          <p>You are not a member of the rewards program yet.</p>
          <button onClick={joinRewards}>Join Rewards Program</button>
        </>
      )}
    </div>
  );
}

export default Rewards;
