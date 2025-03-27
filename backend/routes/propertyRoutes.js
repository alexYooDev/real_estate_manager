const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {createProperty, getPropertiesAll, getSavedProperties, searchProperty, updateProperty, deleteProperty} = require('../controllers/propertyController');


const router = express.Router();

/* Create */
router.post('/create-property', createProperty);
/* View All (Read) */
router.get('/view-all-property', getPropertiesAll);
/* View Saved  (Read) */
router.get('/view-saved-property', protect, getSavedProperties);
/* View Searched (Read) */
router.get('/search-property', searchProperty);
/* Update */
router.put('/update-property/:id', updateProperty);
/* Delete */
router.delete('/delete-property', deleteProperty);

module.exports = router;