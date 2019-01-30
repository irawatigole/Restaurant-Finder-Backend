const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { Menu } = require('../models/menu');
const { validateID } = require('../middlewares/utilities');
const {  autheticateUser, authorizeUser } = require('../middlewares/authentication');

router.get('/', (req,res) => {
    Menu.find().then((menus) => {
        res.send(menus);
    }).catch((err) => {
        res.send(err);  
    })
})

router.post('/',  (req,res) => {
    let body = _.pick(req.body, ['name', 'description', 'price', 'cuisine', 'imageUrl']);
    let menu = new Menu(body);
    menu.save().then((menu) => {
        res.send({
            menu,
            notice: 'Successfully created the menu'
        });
    }).catch((err) => {
        res.send(err);
    })
})

router.get('/:id', validateID, (req, res) => {

    let id = req.params.id;
    Menu.findById(id).populate('cuisine', 'name').then((menu) => {
        if (menu){
        res.send(menu)
        } else {
            res.send({
                notice: 'Menu not found'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

router.delete('/:id', validateID, (req,res) => {

    let id = req.params.id;
    Menu.findByIdAndRemove(id).then((menu) => {
        if(menu) {
            res.send(menu)
        } else {
            res.send({
                notice: 'Menu not found'
            });
        }  
    }).catch((err) => {
        res.send(err);
    });
});


router.put('/id:', validateID, (req,res) => {

    let id = req.params.id;
    let body = req.body;
    Product.findOneAndUpdate({_id: id}, { $set: body }, { new: true, runValidators: true}).then((menu) => {
        if(!menu) {
            res.send({
                notice: 'Menu not found'
            });
        } 
        res.send({
            menu,
            notice: 'Successfully updated the menu'
        });
    }).catch((err) => {
        res.send(err);
    })
});



module.exports = {
    menusController: router
}