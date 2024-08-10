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
            type: Number,
            required: [true, "Du måste ange ett telefonnummer för bokningen"]
        },
        email: {
            type: String,
            required: [true, "Du måste ange en e-postadress för bokningen"],
        }
    },
    bookingDate: {
        type: Date,
        required: [true, "Du måste välja ett datum"]
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