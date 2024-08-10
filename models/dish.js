const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// init express
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// egenskaper för alla maträtter
const dishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // maträttens namn
    description: { type: String, required: true }, // beskrivning av maträtt
    price: { type: Number, required: true }, // pris för rätt
    category: { type: String, required: true },  // kategori (ska den va med?)
    ingredients: [{ type: String }], // ingredienser förhållande till ingrediensschemat
    created: { type: Date, default: Date.now }
});

// inkludera till databas
const Dish = mongoose.model("Dish", dishSchema);

// routes
app.get("/", async (req, res) => {
    res.json({ message: "API for dishes" });
});

// hitta innehåll
app.get("/dishes", async (req, res) => {
    try {
        const result = await Dish.find({});
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ messeage: "Error fetching data", error: error.message });
    }
});

// hitta specifikt innehåll
app.get("/dishes/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Dish.findById(id);
        if (!result) {
        return res.status(404).json({ message: "Data not found" });
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ messeage: "Error fetching data", error: error.message });
    }
});

// lägga till data
app.post("/dishes", async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.validate(); // validerar mot mongoose schemat
        const result = await Dish.create(req.body);
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

// radera data
app.delete("/dishes/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteData = await Dish.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Data could not be deleted" });
        }
        res.json({ message: "Deleted succesfully", deleteData});
    } catch (error) {
        console.error("Error when deleting", error);
        res.status(500).json({ message: "Error when deleting", error: error.message });
    }
});

// uppdatera befintlig
app.put("/dishes/:id", async (req, res) => {
    const id = req.params.id; // tar id frpn url och ger variabel
    const update = req.body; // tar uppdatering från body och ger variabel

    try {
        const result = await Dish.findByIdAndUpdate(id, update, { new: true, runValidators: true }); // returnen blir det uppdaterade
        if (!result) {
            return res.status(404).json({ message: "Could not update data" });
        }
        res.json({ message: "Updated succesfully", result });
    } catch (error) {
        console.error("Error when updating", error);
        res.status(500).json({ message: "Error when updating", error: error.message });
    }
});

// starta server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});