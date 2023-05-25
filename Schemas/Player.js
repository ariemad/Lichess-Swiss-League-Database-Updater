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
      points: Number,
      isUpdated: { type: Boolean, default: false },
    },
    monthly: {
      nbWins: Number,
      avgRank: Number,
      avgPerformance: Number,
      participation: Number,
      points: Number,
      isUpdated: { type: Boolean, default: false },
    },
    allTime: {
      nbWins: Number,
      avgRank: Number,
      avgPerformance: Number,
      participation: Number,
      points: Number,
      isUpdated: { type: Boolean, default: false },
    },
  },
});

const Player = mongoose.model("Player", player);

module.exports = { Player };
