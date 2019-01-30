const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    menu: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Menu'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = {
    cartItemSchema,
    CartItem
}