const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: { // kundens kontaktuppgifter
        name: {
            type: String,
            required: [true, "Du måste ange ett namn för bokningen"],
            trim: true,
            maxlength: [35, "Namnet får inte var längre än 35 tecken"]
        },
        phoneNumber: { 
            type: String,
            required: [true, "Du måste ange ett telefonnummer för bokningen"]
        },
        email: {
            type: String,
            required: [true, "Du måste ange en e-postadress för bokningen"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ogiltigt format (ex. exempel@live.com)"] // giltig adress får ej börja med mellanslag eller @ följt av @ och sedan tecken som återigen inte består av mellanrum eller @ följt av en punk och tecken
        }
    },
    bookingDate: {
        type: Date,
        required: [true, "Du måste välja både datum och tid"]
    },
    guests: {
        type: Number,
        required: [true, "Du måste välja antal gäster"],
        min: 1
    },
    requests: { // speciella önskemål (inte oblig)
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["Confirmed", "Pending", "Cancelled"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema); // inkludera till databas
module.exports = Booking; // exportera modell