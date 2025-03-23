const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {createProperty, getPropertiesAll, getSavedProperties, searchProperty, updateProperty, deleteProperty} = require('../controllers/propertyController');


const router = express.Router();

router.post('/create-property', createProperty);
router.get('/view-all-property', getPropertiesAll);
router.get('/view-saved-property', protect, getSavedProperties);
router.put('/update-property/:id', updateProperty);
router.delete('/delete-property', deleteProperty);
router.get('/search-property', searchProperty);

module.exports = router;