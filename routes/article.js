const express = require("express");
const userRoute = express.Router();
const Article = require("../models/Article");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
require("dotenv/config");
const verifyToken = require("./verifyToken"); // middleware | function to verfiy token

userRoute.get("/", verifyToken, async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.log(err);
  }
});

userRoute.post("/", verifyToken, async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      author: req.body.author,
      details: req.body.details,
    });
    res.send(article);
  } catch (err) {
    console.log(err);
  }
});

// article route patch request
userRoute.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: { title: req.body.title },
      }
    );
    res.send(`Title ${req.body.title} has been successfully Updated...`);
  } catch (err) {
    console.log(err);
  }
});

userRoute.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteArticle = await Article.findByIdAndDelete(req.params.id);
    res.send(deleteArticle);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRoute;
