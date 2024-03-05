const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


exports.registerUser = async (req, res) => {

  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or phone number already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.syncOfflineData = async (req, res) => {
  try {
    const offlineData = req.body;
  
    for (const data of offlineData) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        continue;
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = new User({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      });
      await user.save();
      console.log(`User ${data.email} registered from offline data`);
    }
    res.status(200).json({ message: "Offline data synchronized successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
