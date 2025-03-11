const express = require('express');
const {createProperty} = require('../controllers/propertyController');


const router = express.Router();

router.post('/create-property', createProperty)

module.exports = router;