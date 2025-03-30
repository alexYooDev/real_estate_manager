const url = require('url');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {

    /* retrieve user input from the request body*/
    const { name, email, password, role, agency } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, role, agency });

        res.status(201).json({ 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          agency: user.agency, 
          token: generateToken(user.id) 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {

  /* get email and password from request */
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        /* compare user input password with the pre-stored hashed password */
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ 
              id: user.id, 
              name: user.name, 
              email: user.email, 
              role: user.role, 
              savedProperties: user.savedProperties, 
              propertiesListed: user.propertiesListed, 
              token: generateToken(user.id) 
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password', error: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAgentDetail = async(req, res) => {

    try {
      const agent = await User.findById(req.params.id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }

      res.status(200).json({
        name: agent.name,
        email: agent.email,
        agency: agent.agency,
        propertiesListed: agent.propertiesListed,
        savedProperties: agent.savedProperties,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found', error: error.message });
      }
  
      res.status(200).json({
        name: user.name,
        email: user.email,
        agency: user.agency,
        propertiesListed: user.propertiesListed,
        savedProperties: user.savedProperties
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const updateUserProfile = async (req, res) => {
    try {
      
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found', error: error.message });


        const { name, email, agency, savedProperties, propertiesListed } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.agency = agency || user.agency;
        user.savedProperties = savedProperties || user.savedProperties;
        user.propertiesListed = propertiesListed || user.propertiesListed;
        

        const updatedUser = await user.save();
        
        res.json({ 
          id: updatedUser.id, 
          name: updatedUser.name, 
          email: updatedUser.email, 
          agency: updatedUser.agency, 
          savedProperties:  updatedUser.savedProperties, 
          propertiesListed: updatedUser.propertiesListed, 
          token: generateToken(updatedUser.id) 
        });
    
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const forgotPassword = async (req, res) => {
  try {
    /* get email input */
    const {email} = req.body;
    /* if user exists with the same email */
    const user = await User.findOne({email: email});

    if (!user) {
      return res.status(404).json({message: "User Not Found!"});
    }

    // Generate reset token for password reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Store reset password token to user 
    user.resetPasswordToken = hashedToken;

    // set the reset token expiry time to 1 hour
    user.resetPasswordExpires = Date.now() + 3600000;

    // redirect link for reset password page
    const resetLink = `http://3.27.92.143/reset-password/${resetToken}`;

    /* configure administrative email for reset password email genenration */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      }
    });

    /* send email with the configured email */
    await transporter.sendMail({
      to: email,
      subject: '[Real Estate Manager] Your Password Reset Confirmation',
      html: `<p>You requested a password reset. Click the link below:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>If you didn't request this, ignore this email.</p>`,
    });

    await user.save();

    res.json({ message: 'Reset link sent to email!' });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    /* Hash the token and search for the user */
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    /* find user with the valid token */
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      /* Check if token is still valid */
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token', error: error.message });
    }

    user.password = newPassword

    /* clear user's reset password token from the collection upon setting new password */
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password updated successfully!' });

  } catch(error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const updateSavedPost = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({message: "User not found!", error: error.message});
    }

    const { propertyId } = req.body;
    const propertyExists = user.savedProperties.includes(propertyId);

    let updatedUser;

    // if user already saved the same post, unsave : remove previously saved property
    if (propertyExists) {
      user.savedProperties = user.savedProperties.filter(
        (id) => id.toString() !== propertyId
      );
      await user.save();
      updatedUser =  user;

    } else {
      /* update user collection data's savedProperties field, push a newly saved property's id */
      updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { savedProperties: req.body.propertyId } },
        { new: true }
      );
    }

    res.status(201).json({
      id: updatedUser._id,
      saved: updatedUser.savedProperties,
    });
    
  } catch (error) {
    res.status(500).json({message: "server error", error: error.message});
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
  getAgentDetail,
  updateSavedPost,
  forgotPassword,
  resetPassword,
};
