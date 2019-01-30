const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { User } = require('../models/user');
const { CartItem } = require('../models/cart_item');
const { validateID } = require('../middlewares/utilities');
const { autheticateUser } = require('../middlewares/authentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      
    }
    });

  });
  
  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name }; // Create JWT Payload
  
          jwt.sign(
            payload,
          'secret',
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
            console.log(password)
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  });

  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
    }
  );

router.get('/cart_items',passport.authenticate('jwt', { session: false }), (req,res) => {
    // let user = req.locals.user;
    // res.send(user.cartItems);
    res.send(req.user.cartItems);
})

router.post('/cart_items',passport.authenticate('jwt', { session: false }), (req,res) => {
    let user = req.user;
    let body = _.pick(req.body, ['menu', 'quantity']);
    let cartItem = new CartItem(body);

    let inCart = user.cartItems.find(function(item){
        return item.menu.equals(cartItem.menu);
    })
    if(inCart) {
        inCart.quantity = inCart.quantity + cartItem.quantity;
    } else {
        user.cartItems.push(cartItem);
    }
    user.save().then((user) => {
        res.send({
            cartItem,
            notice: 'Successfully added the menu to the cart'
        });
    }).catch((err) => {
        res.send(err);
    })
})

router.put('/cart_items/:id', validateID, passport.authenticate('jwt', { session: false }), (req, res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
   
    let body = _.pick(req.body, ['quantity']);
    let inCart = user.cartItems.id(cartItemId);
    inCart.quantity = body.quantity;
    user.save().then((user) => {
        res.send({
            cartItem: inCart,
            notice: 'Successfully updated the quantity of the menu'
        })
    }).catch((err) => {
        res.send(err);
    })
})

router.delete('/cart_items/:id', validateID, passport.authenticate('jwt', { session: false }), (req,res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
    user.cartItems.id(cartItemId).remove();
    user.save().then((user) => {
        res.send({
            notice: 'Successfully removed the menu from the cart'
        });
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = {
    usersController: router
}