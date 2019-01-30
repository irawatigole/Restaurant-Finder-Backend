const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftCardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

module.exports = {
    GiftCard
}