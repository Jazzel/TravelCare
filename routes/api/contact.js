const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const Contact = require("../../models/Contact");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, description } = req.body;

      let contact = new Contact({
        name,
        email,
        description,
      });

      contact.save();
      return res.status(200).send("Contact Created !");
    } catch (error) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// get all contacts will useremail
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const contacts = await Contact.find({ email: email });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
