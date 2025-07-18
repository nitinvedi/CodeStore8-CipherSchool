const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};


exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
