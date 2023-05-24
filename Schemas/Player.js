const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const player = new Schema({
  _id: { type: String, auto: false }, // String is shorthand for {type: String}
  username: String,
  updated: Boolean,
  tournaments: Array,
  stats: {
    weekly: {
      nbWins: Number,
      avgRank: Number,
      avgPerformance: Number,
      participation: Number,
    },
    monthly: {
      nbWins: Number,
      avgRank: Number,
      avgPerformance: Number,
      participation: Number,
    },
    allTime: {
      nbWins: Number,
      avgRank: Number,
      avgPerformance: Number,
      participation: Number,
      absent: Number,
    },
  },
});

const Player = mongoose.model("Player", player);

module.exports = { Player };
