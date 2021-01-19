const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  property1: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TestSchema", testSchema);
