const venderController = require('../Controller/venderController')
const VenderModel = require('../models/vender')
const express = require('express')
const router = express.Router();

router.post('/register',venderController.venderRegister);

router.post('/login',venderController.vendorLogin);

router.get('/all-vendors' , venderController.getAllVendors)

router.get('/one-vendor/:id', venderController.getVendorById);


module.exports = router;