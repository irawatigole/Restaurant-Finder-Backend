const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const fs = require('fs');
// const multer = require('multer');

const menuSchema = new Schema({
    cuisine: {
        type: Schema.Types.ObjectId,
        ref: 'Cuisine',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    imageUrl: {
        required: true,
        type: String
    }
   
});


const Menu = mongoose.model('Menu', menuSchema);

module.exports = {
    Menu
}