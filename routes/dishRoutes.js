const express = require("express");
const router = express.Router();
const Dish = require("../models/dish");

// hämta alla maträtter
router.get("/dishes", async (req, res) => {
    try {
        const result = await Dish.find({});
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// hämta en specifik maträtt
router.get("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findById(req.params.id);
        if (!result) return res.status(404).json({ message: "Data not found" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});


// lägg till en ny maträtt
router.post("/dishes", async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.validate(); // validerar mot mongoose
        const result = await newDish.save(req.body);
        return res.status(201).json(result);
    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valieringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        return res.status(400).json({ message: "Error adding data", error: error.message });
    }
});

/*
router.post("/dishes", async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        const result = await newDish.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: "Error adding data", error: error.message });
    }
});
*/

// uppdatera en maträtt
router.put("/dishes/:id", async (req, res) => {
    try {
        const result = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) return res.status(404).json({ message: "Could not update data" });
        res.json({ message: "Updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error when updating", error: error.message });
    }
});

// ta bort en maträtt
router.delete("/dishes/:id", async (req, res) => {
    try {
        const deleteData = await Dish.findByIdAndDelete(req.params.id);
        if (!deleteData) return res.status(404).json({ message: "Data could not be deleted" });
        res.json({ message: "Deleted successfully", deleteData });
    } catch (error) {
        res.status(500).json({ message: "Error when deleting", error: error.message });
    }
});

module.exports = router;