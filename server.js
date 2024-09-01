const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes/ToDoRoute');
require('dotenv').config();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

const PORT = process.env.port || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.render("start");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/loginsubmit", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  db.collection("users").where("email", "==", email).where("password", "==", password).get().then((docs) => {
    if (docs.size > 0) {
      res.render("collide");
    } else {
      res.render("login", { message: "User not found" });
    }
  });
});

app.get("/signupsubmit", (req, res) => {
  const full_name = req.query.full_name;
  const email = req.query.email;
  const password = req.query.password;
  const date = req.query.date;

  db.collection('users').add({
    name: full_name,
    email: email,
    password: password,
    DOB: date
  }).then(() => {
    res.render('login');
    console.log("signed successfull");
  });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.use(routes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
