const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailerConfig');
const { User } = require('../models/user');
const db = require('../models/index.js');
const dotenv = require('dotenv');
dotenv.config();

const verifyEmail = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      phone,
      password,
      location,
      role,
      photo,
      profession,
      experience,
      specific_skills,
      description,
      qualities,
      certification,
      service,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      {
        name,
        surname,
        email,
        phone,
        password: hashedPassword,
        location,
        role,
        photo,
        profession,
        experience,
        specific_skills,
        description,
        qualities,
        certification,
        service,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Adjusted URL for backend API endpoint
    const backendVerificationUrl = `http://localhost:3000/auth/signup?token=${token}`;
    const redirectUrl = 'http://localhost:5173/'; // Replace with the actual URL of your app

    // HTML email template
    const emailTemplate = `
      <p>Hi ${name},</p>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${backendVerificationUrl}">Verify Email</a>
    `;

    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: emailTemplate,
    });

    res.status(200).json({ message: 'Verification email sent. Please verify your email to complete registration.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during signup.' });
  }
};


const signup = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.create({
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
      phone: decoded.phone,
      password: decoded.password,
      location: decoded.location,
      role: decoded.role,
    });
    if (decoded.role === 'provider') {
      await db.Provider.create({
        user_id: user.id,
        photo: decoded.photo,
        profession: decoded.profession,
        experience: decoded.experience,
        specific_skills: decoded.specific_skills,
        description: decoded.description,
        qualities: decoded.qualities,
        certification: decoded.certification,
        service: decoded.service,
      });
    }
    res.status(200).json({ message: 'Email verified successfully. User created.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { signup, verifyEmail, login };