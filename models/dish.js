const mongoose = require("mongoose");

// egenskaper för alla maträtter
const dishSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Maträtten måste ha ett namn"], 
        trim: true,
        minlength: [3, "Namnet måste vara minst 3 tecken långt"],
        maxlength: [25, "Namnet får inte vara längre än 25 tecken långt"],
        unique: true 
    }, 
    description: { 
        type: String, 
        required: [true, "Ange en beskrivning av maträtten"], 
        minlength: [10, "Beskrivning måste vara minst 10 tecken lång"],
        maxlength: [60, "Beskrivningen får inte vara längre än 100 tecken"]
    }, 
    price: { 
        type: Number, 
        required: [true, "Du måste ange ett pris för maträtten"], 
    }, 
    category: { 
        type: String, 
        required: [true, "Vänligen kategorisera rätten som för-, huvud- eller efterrätt"] 
    },  
    contains: {
        type: String,
        required: [true, "Du behöver ange vad rätten innehåll, t.ex. nötter eller gluten"]
    },
    ingredients: { // fixa modell till detta för antal och mängd? 
        type: String, 
        required: [true, "Du måste ange maträttens ingredienser"]
    }, 
    created: { 
        type: Date, default: Date.now 
    }
});

// virtuell egenskap som visar kr efter pris
dishSchema.virtual("currency").get(function() {
    return this.price + "kr";
});

// inkluderar virtuella fält vid konvertering till json
dishSchema.set("toJSON", { virtuals: true });
dishSchema.set("toOBJECT", { virtuals: true });

const Dish = mongoose.model("Dish", dishSchema); // inkludera till databas
module.exports = Dish; // exporterar modellen så den kan användas i andra filer