const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const syllabusSchema = new Schema({
  date: {
    type: Date,
    default: mongoose.now(),
  },
  chapter: {
    type: String,
  },
  syllabus: {
    type: String,
  },
  class: {
    type: String,
  },
});

module.exports = mongoose.model("Syllabus", syllabusSchema);
