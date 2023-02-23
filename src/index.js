const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require("./routes/route")
const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Clustor0:Adit1998@cluster0.qmhuqaw.mongodb.net/Assignment",{useNewUrlParser: true,})
  .then(() =>
    console.log("MongoDB is connected")
  )
  .catch((err) => console.log(err));

  app.use("/", route);

  app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
  });