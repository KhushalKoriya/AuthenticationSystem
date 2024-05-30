const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const registerUser = async (req, res, role) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });

        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${process.env.CLIENT_URL}/verify-email/${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending verification email');
            }
            res.status(201).send('Registration successful, please check your email for verification link');
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Server error');
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    if (!token) return res.status(400).send('No token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.update({ emailVerified: true }, { where: { id: decoded.id } });
        res.send('Email verified successfully');
    } catch (err) {
        return res.status(400).send('Invalid token');
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Email and password are required');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email} });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.emailVerified) {
            console.log('Please verify your email');
            return res.status(400).json({ message: 'Please verify your email' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token ,role: user.role });
    } catch (err) {
        console.error('Server error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    verifyEmail,
    loginAdmin,
};
