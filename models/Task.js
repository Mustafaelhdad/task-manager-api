const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "This field must be provided"],
    trim: true,
    minlength: ["4", "This field must have at least 4 characters"],
  },
  completed: {
    type: Boolean,
    default: false
  },
})

module.exports = mongoose.model("Task", TaskSchema)
