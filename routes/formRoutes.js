const express = require("express");
const Form = require("../models/FormSchema");
const router = express.Router();

// Create a new form
router.post("/", async (req, res) => {
  // const data = {
  //   title: "MyForm",
  //   fields: [
  //     {
  //       id: 118,
  //       type: "text",
  //       label: "FullName",
  //       placeholder: "FullName",
  //     },
  //   ],
  // };
  const { title, fields } = req.body;
  try {
    const newForm = new Form({ title, fields });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  res.send({ message: "hello" });
  res.status(200);
});
// Get all forms
router.get("/get", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single form by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a form by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, fields } = req.body;
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, fields }
      // { new: true }
    );
    if (!updatedForm)
      return res.status(404).json({ message: "Form not found" });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a form by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm)
      return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
