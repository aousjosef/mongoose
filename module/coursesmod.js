const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  courseName: { type: String, required: true },
  coursePeriod: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
