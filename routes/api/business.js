const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Business = require("../../models/Business");

router.post("/", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, description, addedBy } = req.body;

    const business = new Business({
      name,
      description,
      addedBy,
    });

    business.save();
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

router.put("/", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id, name, description, addedBy } = req.body;

    const business = Business.findById(id);

    business.name = name || business.name;
    business.description = description || business.description;
    business.addedBy = addedBy || business.addedBy;

    business.save();
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

router.delete("/", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.body;

    const business = Business.findById(id);

    business.remove();
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const businesses = Business.find();
    return res.status(200).send({
      businesses,
    });
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

router.get("/:id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.params;

    const business = Business.findById(id);
    return res.status(200).send({
      business,
    });
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
