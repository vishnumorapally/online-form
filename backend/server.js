const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:3000' })); // React frontend URL


app.use(cors());
app.use(express.json());

app.get("/api/form/users", async (req, res) => {
    try {
      const users = await FormModel.find(); // Fetch all user entries
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
