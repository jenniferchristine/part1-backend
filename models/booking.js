const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: { // kundens kontaktuppgifter
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    bookingDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    requests: { // speciella önskemål (inte oblig)
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["confirmed", "pending", "cancelled"],
        default: "pending"
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