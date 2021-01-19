const express = require("express");
const router = express.Router();
const TestSchema = require("../models/testModel");

// Route to get all things.
router.get("/", async (req, res) => {
  try {
    const data = await TestSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get one thing.
// `:id` is a parameter.
router.get("/:id", getData, (req, res) => {
  res.json(res.data);
});

// Route to create a thing.
router.post("/", async (req, res) => {
  const data = new TestSchema({
    name: req.body.name,
    property1: req.body.property1,
  });

  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update a thing.
router.patch("/:id", getData, async (req, res) => {
  if (req.body.name != null) {
    res.data.name = req.body.name;
  }

  if (req.body.property1 != null) {
    res.data.property1 = req.body.property1;
  }

  try {
    const updatedData = await res.data.save();
    res.json(updatedData);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a thing.
router.delete("/:id", getData, async (req, res) => {
  try {
    await res.data.remove();
    res.json({ message: "Deleted data" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getData(req, res, next) {
  let data;

  try {
    data = await TestSchema.findById(req.params.id);
    if (data == null)
      return res
        .status(404)
        .json({ message: "Cannot find data with provided ID" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.data = data;
  next();
}

module.exports = router;
