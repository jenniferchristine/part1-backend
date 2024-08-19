const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// importera
const authRoutes = require("./routes/authRoutes");
const dishRoutes = require("./routes/dishRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
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

// offentlig route för att nå api
app.get("/", (req, res) => {
    res.json({ message: "PASTA PLACE API :-)" });
});

// offentlig route för att se meny
app.get("/dishes", dishRoutes);

// skyddat resterande crud av meny
app.post("/dishes", authenticateToken, dishRoutes);
app.put("/dishes/:id", authenticateToken, dishRoutes);
app.delete("/dishes", authenticateToken, dishRoutes);

// offentlig post route för att boka bord
app.post("/bookings", bookingRoutes);

//skyddat resterande av CRUD för bokning
app.get("/bookings", authenticateToken, bookingRoutes);
app.put("/bookings/:id", authenticateToken, bookingRoutes);
app.delete("/bookings/:id", authenticateToken, bookingRoutes);

// skyddad route för inlogg
app.get("/admin", authenticateToken, (req, res) => {
    res.json({ message: "Protected route..." });
});

// starta servern
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});