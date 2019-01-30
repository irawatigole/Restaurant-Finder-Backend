const express = require('express');
const router = express.Router();

const { cuisinesController } = require('../app/controllers/cuisines_controller');
const { restaurantsController } = require('../app/controllers/restaurants_controller');
const { giftCardsController } = require('../app/controllers/giftCards_controller');
const { menusController } = require('../app/controllers/menus_controller');
const { ordersController } = require('../app/controllers/orders_controller');
const { seatStatusController } = require('../app/controllers/seatStatus_controller');
const { usersController } = require('../app/controllers/users_controller');


router.use('/cuisines', cuisinesController);
router.use('/restaurants', restaurantsController);
router.use('/giftCards',  giftCardsController);
router.use('/menus', menusController);
router.use('/orders', ordersController);
router.use('/seatStatus', seatStatusController);
router.use('/users', usersController);

module.exports = {
    routes: router
}