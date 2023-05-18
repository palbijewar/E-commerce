const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const productController = require('../controllers/productsController');

router.post('/products', productController.products);
router.get('/allProducts', productController.allProducts);
router.get('/fetchProducts', productController.fetchProduct);
router.get('/fetching', productController.fetching);
router.get('/inBetween', productController.inBetween);
router.get('/usingReg', productController.usingReg);
router.get('/randomProduct', productController.randomProduct)

module.exports = router;