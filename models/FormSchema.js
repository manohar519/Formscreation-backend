const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  id: Number,
  type: String,
  label: String,
  placeholder: String,
});

const formSchema = new mongoose.Schema({
  title: String,
  fields: [fieldSchema],
});

module.exports = mongoose.model("Form", formSchema);
