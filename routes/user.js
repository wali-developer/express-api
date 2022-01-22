const express = require("express");
const articleRoute = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(300).required(),
});

articleRoute.get("/", (req, res) => {
  res.send("we are at user route...");
});

articleRoute.post("/register", async (req, res) => {
  const message = userSchema.validate(req.body);
  if (message.error) {
    res.send(message.error.details[0].message);
  } else {
    try {
      const alreadyUser = await User.findOne({ email: req.body.email });
      if (alreadyUser === null) {
        // insert into DB !!
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const userReg = await User.create({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
        });
        res.send(`${req.body.email} user has successfully Registered ...`);
      } else {
        res.send("User is already registered...");
      }
    } catch (err) {
      console.log(err);
    }
  }
});
articleRoute.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      const verified = await bcrypt.compare(password, userEmail.password);
      console.log(verified);
      if (verified) {
        // res.send("Logged in !!!!!!!");
        const token = jwt.sign(
          { _id: userEmail._id, iat: Date.now() },
          process.env.SECRET
        );
        res.send(token);
        // const j = jwt.verify(token, process.env.SECRET);
        // res.send(j);
      } else {
        res.send("User or password is incorrect ...");
      }
    } else {
      res.send("User or password is incorrect ...");
    }
  } catch (error) {
    console.log(error);
  }
});

articleRoute.patch("/", (req, res) => {
  res.send("we are at user route with Patch request...");
});

articleRoute.delete("/", (req, res) => {
  res.send("we are at user route with delete request...");
});

module.exports = articleRoute;
