const express = require('express');
const _ = require('lodash');
const router = express.Router();

const { Cuisine } = require('../models/cuisine');
const { validateID } = require('../middlewares//utilities');
const { Menu } = require('../models/menu');
const { autheticateUser, authorizeUser } = require('../middlewares/authentication');


router.get('/', (req, res) => {
    Cuisine.find().then((cuisines) => {
        res.send(cuisines); 
    }).catch((err) => {
        res.send(err); 
    });
});

router.get('/:id', validateID, (req, res) => {
    let id = req.params.id; 
    Cuisine.findById(id).then((cuisine) => {
        if(cuisine) {
            res.send(cuisine); 
        } else {
            res.send({
                notice: 'Cuisine not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
});

router.post('/', (req,res) => {
    let body = _.pick(req.body, ['name']);
    let cuisine = new Cuisine(body);
    cuisine.save().then((cuisine) => {
        res.send({
            cuisine
            // notice: 'successfully created a cuisine'
        });
    }).catch((err) => { 
        res.send((err))
    })
})

router.put('/:id', validateID, (req,res) => {
    let id = req.params.id;
    let body = req.body;

    Cuisine.findOneAndUpdate({_id: id}, { $set: body}, {new: true, runValidators: true}).then((cuisine) => {
        if (!cuisine) {
            res.send({
                notice: 'Cuisine not found'
            })
        }
            res.send({
                cuisine,
                notice:'Successfully updated the cuisine'
            })
      }).catch((err) => {
          res.send(err);
      })
})

router.delete('/:id', validateID,  (req, res) => {
    let id = req.params.id;
    Cuisine.findOneAndRemove(id).then((cuisine) => {
        if (cuisine) {
            res.send(cuisine);
        } else {
            res.send({
                notice:'Cuisine not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    })
})

router.get('/:id/menus', validateID, (req,res) => {
    let id = req.params.id;
   
    Menu.find({ cuisine: id }).then((cuisines) => {
        res.send(cuisines);
    }).catch((err) => {
        res.send(err);
    })  
})

module.exports = {
    cuisinesController: router
}