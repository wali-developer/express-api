const express = require("express");
const app = express();
const PORT = 3001 || process.env.PORT;
const articleRoute = require("./routes/article");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require('cors')

// middlewars
app.use(cors());
app.use(express.json()); // body parser
// article end point
app.use("/article", articleRoute);
// user end point
app.use("/user", userRoute);

mongoose.connect(process.env.DB_CONNECT, () =>
  console.log("Connected to Database!")
);

// app listening on port 3001
app.listen(PORT, () => console.log("Api Running on PORT: " + PORT));
