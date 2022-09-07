const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const { validationResult, check } = require("express-validator");
const User = require("./models/User");

const app = express();
const port = 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.post(
  "/api/change-password",
  [
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password, code } = req.body;

    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(user.name);
      if (user.confirmationCode !== code) {
        return res
          .status(404)
          .send({ message: "Something went wrong. Try Again !" });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save();

      return res.status(200).send({ message: "Password changed" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Confirm User
// @access   Public
app.post("/:code", async (req, res) => {
  User.findOne({
    confirmationCode: req.params.code,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
});

app.post(
  "/api/send-email",
  [check("email", "Email is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;
    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // TODO: send email !
      return res.status(200).send({ message: "Email sent." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

app.post(
  "/api/verify",
  [
    check("code", "Code is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, code } = req.body;

    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (user.confirmationCode !== code) {
        return res.status(404).send({ message: "Wrong Code." });
      }

      return res.status(200).send({ message: "User authorized" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
