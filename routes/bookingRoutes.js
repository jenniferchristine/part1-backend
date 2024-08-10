const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// hämta alla bokningar
router.get("/bookings", async (req, res) => {
    try {
        const result = await Booking.find({});
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// lägg till en ny bokning
router.post("/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const result = await newBooking.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: "Error adding data", error: error.message });
    }
});

// uppdatera en bokning
router.put("/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) return res.status(404).json({ message: "Could not update data" });
        res.json({ message: "Updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error when updating", error: error.message });
    }
});

// hämta en specifik bokning
router.get("/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findById(req.params.id);
        if (!result) return res.status(404).json({ message: "Data not found" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// ta bort en bokning
router.delete("/bookings/:id", async (req, res) => {
    try {
        const deleteData = await Booking.findByIdAndDelete(req.params.id);
        if (!deleteData) return res.status(404).json({ message: "Data could not be deleted" });
        res.json({ message: "Deleted successfully", deleteData });
    } catch (error) {
        res.status(500).json({ message: "Error when deleting", error: error.message });
    }
});

module.exports = router;