const mongoose = require("mongoose");
const { getFormattedDate } = require("../utils/dateUtils");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  createdDate: { type: String, default: getFormattedDate() },
});

module.exports = mongoose.model("Project", projectSchema);
