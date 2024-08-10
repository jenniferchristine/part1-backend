const mongoose = require("mongoose");

/*
(async () => {
    try {
        await mongoose.connect("mongodb+srv://jeja2306:JejaMiun123@jeja.t13agrm.mongodb.net/");
        console.log("Connected to MongoDB...");
        
        const newDish = new Dish({
            name: "Lemon pasta", 
            description: "God maträtt", 
            price: "129", 
            category: "Huvudrätt",
            ingredients: ["Parmesan", "Citron", "Pasta"],
        });
        
        await newDish.save();
        console.log("Insert successful");
        
    } catch (error) {
        console.error("Error when connecting to the database:", error);
    }
})();
*/

// egenskaper för alla maträtter
const dishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // maträttens namn
    description: { type: String, required: true }, // beskrivning av maträtt
    price: { type: Number, required: true }, // pris för rätt
    category: { type: String, required: true },  // kategori (ska den va med?)
    ingredients: [{ type: String }], // ingredienser förhållande till ingrediensschemat
    created: { type: Date, default: Date.now }
});

const Dish = mongoose.model("Dish", dishSchema); // inkludera till databas
module.exports = Dish; // exporterar modellen så den kan användas i andra filer