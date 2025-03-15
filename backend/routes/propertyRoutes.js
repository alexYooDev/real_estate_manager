const express = require('express');
const {createProperty, getPropertiesAll, searchProperty, updateProperty, deleteProperty} = require('../controllers/propertyController');


const router = express.Router();

router.post('/create-property', createProperty);
router.get('/view-all-property', getPropertiesAll);
router.post('/update-property/:id', updateProperty);
router.post('/delete-property', deleteProperty);
router.get('/search-property', searchProperty);

module.exports = router;