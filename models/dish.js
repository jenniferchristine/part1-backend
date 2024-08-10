const mongoose = require("mongoose");

// egenskaper för alla maträtter
const dishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // maträttens namn
    description: { type: String, required: true }, // beskrivning av maträtt
    price: { type: Number, required: true }, // pris för rätt
    category: { type: String, required: true },  // kategori (ska den va med?)
    ingredients: [{ type: String }], // ingredienser förhållande till ingrediensschemat
    created: { type: Date, default: Date.now }
});

const dish = mongoose.model("Dish", dishSchema); // inkludera till databas

const Dish = mongoose.model("Dish", dishSchema); // skapar modell baserat på userSchema
module.exports = Dish; // exporterar modellen så den kan användas i andra filer