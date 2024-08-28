const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// hämta alla bokningar
router.get("/bookings", async (req, res) => {
    try {
        const result = await Booking.find({});

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found: Could not fetch bookings" }); // statuskod ingen data finns
        }
        res.status(200).json({ message: "Bookings was found", result }); // statuskod okej resultat
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message }); // statuskod serverfel
    }
});

// lägg till en ny bokning
router.post("/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.validate(); // validerar mot mongoose
        const result = await newBooking.save(req.body);
        return res.status(201).json({ message: "Booking successfully added", result }); // lyckad status kod för ny resurs

    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valieringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message }); // statuskod oväntat fel
    }
});

// uppdatera en bokning
router.put("/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true }); // returnera det uppdaterade dokumentet
        
        if (!result) {
            return res.status(404).json({ message: "No data found: Could not find specific booking" });
        }
        await result.validate(); // validerar mot mongoose
        return res.status(200).json({ message: "Updated booking successfully", result }); // ändra status till 200 för lyckade uppdateringar

    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valideringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Error updating data", error: error.message });
    }
});

// hämta en specifik bokning
router.get("/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findById(req.params.id);
        
        if (!result) {
            return res.status(404).json({ message: "No data found: Could not find specific booking" });
        }
        res.status(200).json({ message: "Booking was found", result });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching specific data", error: error.message });
    }
});

// ta bort en bokning
router.delete("/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "No data found: Could not delete specific booking" });
        }
        res.status(200).json({ message: "Deleted booking successfully", result });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Error when deleting specific data", error: error.message });
    }
});

module.exports = router;