const mongoose = require("mongoose");
const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: false }
});
module.exports = mongoose.model("Module", ModuleSchema);