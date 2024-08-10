const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// importera
const authRoutes = require("./routes/authRoutes");
const dishRoutes = require("./routes/dishRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

/*app.use(express.json());*/
app.use(bodyParser.json());
app.use(cors());

// anslut till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB...");
}).catch((error) => {
    console.error("Error when connecting to database...", error);
});

// routes
app.use("/", authRoutes, dishRoutes);

app.get("/", (req, res) => {
    res.json({ message: "PASTA PLACE API :-)" });
});

// skyddad route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected route..." });
});

// starta servern
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
