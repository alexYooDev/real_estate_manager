
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile, getUserDetail, updateSavedPost, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { updateProperty } = require('../controllers/propertyController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/detail/:id', getUserDetail);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/save-post', protect, updateSavedPost);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword)

module.exports = router;
