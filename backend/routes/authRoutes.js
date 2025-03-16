
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile, getUserDetail } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { updateProperty } = require('../controllers/propertyController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/detail/:id', getUserDetail);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
