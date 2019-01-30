const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { cartItemSchema } = require('./cart_item');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    date: {
        type: Date,
        default: Date.now
    },
    cartItems: [cartItemSchema]
    
});


// userSchema.pre('save', function(next){
//     let user = this;
//     if (this.isNew){
//     bcrypt.genSalt(10).then((salt) => {
//         bcrypt.hash(user.password, salt).then((hashed) =>{
//         user.password = hashed;
//         next();
//         })
//     });
// }
// });

// userSchema.methods.generateToken = function(next) {
//     let user = this;
//     let tokenData = {
//         _id: user.id
//     };
// here we have hardcoded the value 'supersecret', but in actual application, you will not do like this,it must read from process object
//     let token = jwt.sign(tokenData, 'secret');
//     user.tokens.push({
//         token
//     });
//      return user.save().then(() => {
//         return token; 
//     }); 
// }

// userSchema.methods.shortInfo = function() {    
//     return {
//         _id: this._id,
//         username: this.username,
//         email: this.email,
//         token: this.tokens.token
//     }
// }

// userSchema.statics.findByToken = function(token) {
//     let User = this;    
//     let tokenData;
//     console.log(token)            
//     try {
//         tokenData = jwt.verify(token, 'supersecret');
//     } catch(e) {                                          
//         return Promise.reject(e);
//     }
//     return User.findOne({               
//         _id: tokenData._id,                
//         'tokens.token': token             
//     }).then((user) => {
//         if(user) {
//             return Promise.resolve(user);
//         } else {
//             return Promise.reject(user); 
//         }
//     })
// };


const User = mongoose.model('User', userSchema);

module.exports = { 
    User
}





