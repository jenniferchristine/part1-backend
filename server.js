const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Dish = require("./models/dish");

// importera
const authRoutes = require("./routes/authRoutes");
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
    res.json({ message: "PASTA PLACE API :-)" });
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

// hämta en specifik maträtt
app.get("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findById(req.params.id);
        if (!result) return res.status(404).json({ message: "Data not found" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// lägg till en ny maträtt
app.post("/dishes", async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        const result = await newDish.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: "Error adding data", error: error.message });
    }
});

// uppdatera en maträtt
app.put("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) return res.status(404).json({ message: "Could not update data" });
        res.json({ message: "Updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error when updating", error: error.message });
    }
});

// ta bort en maträtt
app.delete("/dishes/:id", async (req, res) => {
    try {
        const deleteData = await Dish.findByIdAndDelete(req.params.id);
        if (!deleteData) return res.status(404).json({ message: "Data could not be deleted" });
        res.json({ message: "Deleted successfully", deleteData });
    } catch (error) {
        res.status(500).json({ message: "Error when deleting", error: error.message });
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
