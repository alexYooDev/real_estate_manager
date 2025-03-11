const express = require('express');
const {createProperty, getPropertiesAll} = require('../controllers/propertyController');


const router = express.Router();

router.post('/create-property', createProperty);
router.get('/view-all-property', getPropertiesAll);

module.exports = router;