const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: { // kundens kontaktuppgifter
        name: {
            type: String,
            requried: true
        },
        phoneNumber: {
            type: Number,
            requried: true
        },
        email: {
            type: String,
            requried: true
        }
    },
    bookingDate: {
        type: Date,
        requried: true
    },
    guests: {
        type: Number,
        requried: true,
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