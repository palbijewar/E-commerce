const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const middleware = require('../middlewares/middleware')

router.post('/orders', middleware.auth1,ordersController.orders);
router.get('/allOrders',middleware.mid1 ,ordersController.allOrders);
router.get('/findUser/:orderId', ordersController.findUser);
router.get('/findProduct', ordersController.findProduct);

module.exports = router;