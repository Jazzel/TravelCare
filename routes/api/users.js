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

const URL =
  process.env.NODE_ENV === "production"
    ? "https://travel-care.herokuapp.com"
    : "http://localhost:3000";

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

    const { name, email, password, role, businessname, address, phone } =
      req.body;

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
        businessname,
        address,
        phone,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const token = jwt.sign({ email: req.body.email }, config.secret);

      user.confirmationCode = token;
      // user.confirmationCode = "batman";

      await user.save();

      // sendConfirmationEmail(user.name, user.email, user.confirmationCode);

      console.log("sending email ...");

      let transport = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: config.get("user"),
          pass: config.get("pass"),
        },
        tls: {
          rejectUnAuthorized: true,
        },
      });

      const mailOptions = {
        from: `${config.get("user")}`,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Welcome ${name} to TravelCare</h2>
            <p>Thank you for joining our team. Click the following link to confirm and activate your new account:</p>
            <a href=${URL}/confirm/${email}/${token}}>${URL}/confirm/${email}/${token}</a>
            <br/>
            <smaill>If the above link is not clickable, try copying and pasting it into the address bar of your web browser.</smaill>
            </div>`,
      };

      let info = await transport.sendMail(mailOptions);
      console.log(`Message Sent: ${info.messageId}`);
      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      // Return JWT
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

module.exports = router;
