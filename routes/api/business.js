const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Business = require("../../models/Business");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("addedBy", "Added By is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, description, addedBy } = req.body;

      let business = new Business({
        name,
        description,
        addedBy,
      });

      business.save();
      return res.status(200).send("Business Created !");
    } catch (error) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

router.put("/:id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, description, addedBy } = req.body;

    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      return res.status(401).send("Business not found !");
    }

    business.name = name || business.name;
    business.description = description || business.description;

    business.save();
    return res.status(200).send(business);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

router.delete("/:id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.params;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(401).send("Business not found !");
    }

    await business.remove();
    return res.status(200).send("Business deleted !");
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
    let data = [];
    const businesses = await Business.find().sort({ date: -1 });

    if (businesses.length > 0) {
      for (const business of businesses) {
        const userData = await User.findById(business.addedBy).select([
          "name",
          "email",
          "businessname",
          "address",
          "phone",
          "-_id",
        ]);
        if (userData) {
          const user = {
            username: userData.name,
            email: userData.email,
            businessname: userData.businessname,
            address: userData.address,
            phone: userData.phone,
          };
          data = [{ ...business["_doc"], ...user }, ...data];
        }
      }
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

router.get("/:id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.params;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(401).send("Business not found !");
    }

    const userData = await User.findById(business.addedBy).select([
      "name",
      "email",
      "businessname",
      "address",
      "phone",
      "-_id",
    ]);

    const user = {
      username: userData["_doc"].name,
      email: userData["_doc"].email,
      businessname: userData["_doc"].businessname,
      address: userData["_doc"].address,
      phone: userData["_doc"].phone,
    };

    return res.status(200).json({ ...business["_doc"], ...user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
