
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Roles for authorizing users [admin, agent, customer] roles
  role: { type: String, enum: ['admin', 'agent', 'customer'], required: true },

  // customer-role field
  savedProperties: [{ type: mongoose.Types.ObjectId, ref: 'Property' }],

  // agent-role field
  agency: { type: String },
  propertiesListed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],

  // fields for storing reset password token
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
