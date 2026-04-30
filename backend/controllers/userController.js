const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const user = new userModel({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json("invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json("invalid email or password");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.json({
      message: "logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(res);
    })
    .catch(err);
};

const getUserData = async (req, res) => {
  const id = req.user._id || req.params.id; // req.user._id => when user wants to access their account, req.params.id => when authorized members want to access certain account
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json("user not found");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const id = req.user._id || req.params.id;
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    if (!user) {
      return res.status(404).json("user not found");
    }

    const saved = await user.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login, getUserData, getUsers, updateUser };
