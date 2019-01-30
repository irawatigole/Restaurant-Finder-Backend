const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { seatStatusSchema } = require('./seat_status');

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    address: {
        type: Object,
        required: true
        // minlength: 5,
        // maxlength: 1000,     
    },
    'address.street': {
        type: String,
        required: true
    },
    'address.suite': {
        type: String,
        required: true
        
    },
    'address.zipcode': {
        type: String,
        required: true
    },
    'address.city': {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    contactNumber: {
        type: Number,
        required: true
    },
    seatStatus: [seatStatusSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
    Restaurant
}
