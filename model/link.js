const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  date: {
    type: Date,
    default: mongoose.now(),
  },
  chapter: {
    type: String,
  },
  links: [
    {
      link: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  class: {
    type: String,
  },
});

module.exports = mongoose.model("Link", linkSchema);
