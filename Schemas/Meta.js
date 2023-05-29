const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const meta = new Schema({
  _id: { type: Number }, // String is shorthand for {type: String}
  leaderboard: {
    weekly: {
      nbWins: Array,
      avgRank: Array,
      avgPerformance: Array,
      participation: Array,
      points: Array,
    },
    monthly: {
      nbWins: Array,
      avgRank: Array,
      avgPerformance: Array,
      participation: Array,
      points: Array,
    },
    allTime: {
      nbWins: Array,
      avgRank: Array,
      avgPerformance: Array,
      participation: Array,
      points: Array,
    },
  },
});

const Meta = mongoose.model("Meta", meta);

module.exports = { Meta };
