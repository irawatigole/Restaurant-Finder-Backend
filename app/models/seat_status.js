const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatStatusSchema = new Schema({
    tableNumber: {
        type: String,
        unique: true,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    }
});

const SeatStatus = mongoose.model('SeatStatus', seatStatusSchema);

module.exports = {
    SeatStatus,
    seatStatusSchema
}