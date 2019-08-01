const mongoose = require("mongoose");

let statSchema = new mongoose.Schema({
  streak: {
    type: Number,
    required: true
  }
});

let Stat = mongoose.model("Stat", statSchema);
module.exports = Stat;
