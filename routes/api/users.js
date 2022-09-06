const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const nodemailer = require("nodemailer");

const User = require("../../models/User");
const { sendConfirmationEmail } = require("../../config/nodemailer");
const secretToken = config.get("JWTsecretToken");

const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let token = "";
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)];
}

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with alteast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check validations
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });

      user = new User({
        name,
        email,
        role,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const token = jwt.sign({ email: req.body.email }, config.secret);
      user.confirmationCode = token;

      // await user.save();
      console.log("dsad");

      // sendConfirmationEmail(user.name, user.email, user.confirmationCode);

      const transport = nodemailer.createTransport({
        service: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: config.get("user"),
          pass: config.get("pass"),
        },
      });

      transport
        .sendMail({
          from: user,
          to: email,
          subject: "Please confirm your account",
          html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/confirm/dasdasdad}> Click here</a>
            </div>`,
        })
        .catch((err) => console.log(err));

      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      // // Return JWT
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(payload, secretToken, { expiresIn: 360000 }, (err, token) => {
      //   if (err) throw err;
      //   return res.json({ token });
      // });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Confirm User
// @access   Public
router.post("/:code", async (req, res) => {
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

module.exports = router;
