const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// In-memory data stores
const users = [];
const properties = [];
const bookings = [];
const creditCards = [];
const addresses = [];
const neighborhoods = [];

const secretKey = "your_secret_key";

// AUTH ROUTES
app.post("/api/auth/register", (req, res) => {
  const { email, password, type, name, phone } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: "User already exists." });

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { id: users.length + 1, email, password: hashedPassword, type, name, phone, rewards: 0 };
  users.push(newUser);

  res.status(201).json({ message: "Registered successfully" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ id: user.id, type: user.type, name: user.name });
});

// PROPERTIES
app.post("/api/properties", (req, res) => {
  const property = { id: properties.length + 1, ...req.body };
  properties.push(property);
  res.status(201).json(property);
});

app.get("/api/properties/agent", (req, res) => {
  res.json(properties);
});

app.get("/api/properties/search", (req, res) => {
  const { location } = req.query;
  const results = properties.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
  res.json(results);
});

app.get("/api/properties/:id", (req, res) => {
  const prop = properties.find(p => p.id === parseInt(req.params.id));
  if (!prop) return res.status(404).json({ message: "Property not found" });
  res.json(prop);
});

app.delete("/api/properties/:id", (req, res) => {
  const index = properties.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) properties.splice(index, 1);
  res.json({ message: "Property deleted" });
});

// BOOKINGS WITH REWARD POINTS
app.post("/api/bookings", (req, res) => {
  const booking = { id: bookings.length + 1, ...req.body, status: "active" };
  bookings.push(booking);

  // ✅ Find the property to get price
  const property = properties.find(p => p.id === parseInt(req.body.propertyId));
  if (!property) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  // ✅ Find the renter (user who booked)
  const renter = users.find(u => u.id === req.body.renterId);
  if (!renter) {
    return res.status(400).json({ message: "Invalid renter ID" });
  }

  // ✅ Add property price to renter's rewards
  renter.rewards = (renter.rewards || 0) + property.price;

  console.log(`✅ Renter ${renter.id} booked and earned ${property.price} points. Total now: ${renter.rewards}`);

  res.status(201).json(booking);
});

app.get("/api/bookings/renter", (req, res) => {
  res.json(bookings);
});

app.get("/api/bookings/agent", (req, res) => {
  res.json(bookings);
});

app.delete("/api/bookings/:id/cancel", (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (booking) booking.status = "cancelled";
  res.json({ message: "Booking cancelled" });
});

// ADDRESSES
app.get("/api/addresses", (req, res) => {
  res.json(addresses);
});

app.post("/api/addresses", (req, res) => {
  const address = { id: addresses.length + 1, ...req.body };
  addresses.push(address);
  res.status(201).json(address);
});

app.delete("/api/addresses/:id", (req, res) => {
  const index = addresses.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) addresses.splice(index, 1);
  res.json({ message: "Address deleted" });
});

// CREDIT CARDS
app.get("/api/creditcards", (req, res) => {
  res.json(creditCards);
});

app.post("/api/creditcards", (req, res) => {
  const card = { id: creditCards.length + 1, ...req.body };
  creditCards.push(card);
  res.status(201).json(card);
});

app.delete("/api/creditcards/:id", (req, res) => {
  const index = creditCards.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) creditCards.splice(index, 1);
  res.json({ message: "Credit card deleted" });
});

// REWARDS
app.get("/api/rewards", (req, res) => {
  const renterId = parseInt(req.query.userId);

  const renter = users.find(u => u.id === renterId);
  if (!renter) return res.status(400).json({ message: "Invalid renter ID" });

  res.json({ points: renter.rewards || 0 });
});

app.post("/api/rewards/join", (req, res) => {
  res.json({ message: "Joined rewards program" });
});

// NEIGHBORHOODS
app.get("/api/neighborhoods", (req, res) => {
  res.json(neighborhoods);
});

app.post("/api/neighborhoods", (req, res) => {
  const neighborhood = { id: neighborhoods.length + 1, ...req.body };
  neighborhoods.push(neighborhood);
  res.status(201).json(neighborhood);
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
