const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Dish = require("./models/dish");

// importera
const authRoutes = require("./routes/authRoutes");
/*const dishRoutes = require("./routes/dishRoutes");*/
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// anslut till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB...");
}).catch((error) => {
    console.error("Error when connecting to database...", error);
});

// routes
app.use("/api", authRoutes);
/*app.use("/dishes", dishRoutes);*/

app.get("/", (req, res) => {
    res.json({ message: "PASTA PLACE API" });
});

// hämta alla maträtter
app.get("/dishes", async (req, res) => {
    try {
        const result = await Dish.find({});
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// skyddad route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected route..." });
});

// starta servern
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
