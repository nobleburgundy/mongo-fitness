const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: {
    type: String,
    unique: true,
  },
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
