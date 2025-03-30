
const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
  getAgentDetail,
  updateSavedPost,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

/* Authentication */
router.post('/register', registerUser);
router.post('/login', loginUser);

/* Profile */
router.get('/detail/:id', getAgentDetail);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

/* Save user's post */
router.put('/save-post', protect, updateSavedPost);

/* forgot / rest password */
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword)

module.exports = router;
