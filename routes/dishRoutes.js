const express = require("express");
const router = express.Router();
const Dish = require("../models/dish");

// hämta alla maträtter
router.get("/dishes", async (req, res) => {
    try {
        const result = await Dish.find({});

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found" }); // statuskod ingen data finns
        }
        res.status(200).json({ message: "Dishes was found", result }); // statuskod okej resultat
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message }); // statuskod serverfel
    }
});

// lägg till en ny maträtt
router.post("/dishes", async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.validate(); // validerar mot mongoose
        const result = await newDish.save(req.body); // sparar
        return res.status(201).json({ message: "Dish successfully added", result }); // lyckad status kod för ny resurs

    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valieringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// uppdatera en maträtt
router.put("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true }); // returnera det uppdaterade dokumentet
        
        if (!result) {
            return res.status(404).json({ message: "No data found" });
        }
        
        await result.validate(); // validerar mot mongoose
        return res.status(200).json({ message: "Updated dish successfully", result }); // ändra status till 200 för lyckade uppdateringar

    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valideringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Error updating dish", error: error.message });
    }
});

// hämta en specifik maträtt
router.get("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findById(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "No data found: Could not find specific dish" });
        }
        res.status(200).json({ message: "Dish was found", result });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data: Could not find specific dish", error: error.message });
    }
});

// ta bort en maträtt
router.delete("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "No data found: Could not delete specific dish" });
        }
        res.status(200).json({ message: "Deleted dish successfully", result });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Error when deleting dish", error: error.message });
    }
});

module.exports = router;