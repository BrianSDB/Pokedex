/* eslint-disable no-undef */
const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const collection = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      collection
        .create({ name, email, password: hash })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
    })
    .then((err) => {
      res.json(err);
    });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "pokemon-secret", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          return res.json("Success");
        } else {
          return res.json("The password is incorrect");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
