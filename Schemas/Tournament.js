const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const tournament = new Schema({
  _id: { type: String, auto: false }, // String is shorthand for {type: String}
  createdBy: String,
  startsAt: Date,
  name: String,
  clock: {
    limit: Number,
    increment: Number,
  },
  variant: String,
  round: Number,
  nbRounds: Number,
  nbPlayers: Number,
  nbOngoing: Number,
  status: String,
  stats: {
    absences: Number,
    averageRating: Number,
    byes: Number,
    blackWins: Number,
    games: Number,
    draws: Number,
    whiteWins: Number,
  },
  rated: Boolean,
});

const Tournament = mongoose.model("Tournament", tournament);

module.exports = { Tournament };
