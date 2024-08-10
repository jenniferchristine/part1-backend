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

// routes
app.use("/", authRoutes, dishRoutes, bookingRoutes);

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

/*const newBooking = new Booking({
    custome: {
        name: "Jennifer Jakobsson",
        phoneNumber: "0706856249",
        email: "jenifferjacobsson@live.se"
    },
    bookingDate: new Date("2024-08-15T19:00:00Z"), // datum i iso-format
    guests: 3,
    requests: "Glutenfritt",
});

newBooking.save();
console.log("Insert successful");*/