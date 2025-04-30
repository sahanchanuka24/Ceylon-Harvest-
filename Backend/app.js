//password:- 2npps70yajmpiK2q

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const discussionRoutes = require('./Route/discussionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:2npps70yajmpiK2q@cluster0.gf62g.mongodb.net/ceylon-harvest", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/discussions', discussionRoutes);

// Basic route for testing
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ceylon Harvest API" });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});