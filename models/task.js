const mongoose = require("mongoose");
const { getFormattedDate } = require("../utils/dateUtils");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  status: { type: String, required: true },
  createdDate: { type: String, default: getFormattedDate() },
});

module.exports = mongoose.model("Task", taskSchema);
