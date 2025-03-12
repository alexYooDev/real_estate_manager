const express = require('express');
const {createProperty, getPropertiesAll, updateProperty, deleteProperty} = require('../controllers/propertyController');


const router = express.Router();

router.post('/create-property', createProperty);
router.get('/view-all-property', getPropertiesAll);
router.post('/update-property/:id', updateProperty);
router.post('/delete-property', deleteProperty);

module.exports = router;