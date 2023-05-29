const { Meta } = require("../Schemas/Meta");
const { Player } = require("../Schemas/Player");
const { Tournament } = require("../Schemas/Tournament");
const { playerUpdate } = require("./playerUpdate");

async function queryData(timeInterval, category, order) {
  let raw = await Player.find({})
    .sort(`${order}${"stats." + timeInterval + "." + category}`)
    .limit(3);

  let data = raw.map((player) => [
    player._id,
    player.stats[timeInterval][category],
  ]);

  return data;
}

async function metaUpdate() {
  let categories = [
    "nbWins",
    "avgRank",
    "avgPerformance",
    "participation",
    "points",
  ];
  let order = ["-", "", "-", "-", "-"];

  let timeIntervals = ["weekly", "monthly", "allTime"];

  let object = {
    leaderboard: {},
  };

  for (let i = 0; i < timeIntervals.length; i++) {
    object.leaderboard[timeIntervals[i]] = {};
  }

  for (let i = 0; i < timeIntervals.length; i++) {
    let timeInterval = timeIntervals[i];
    for (let j = 0; j < categories.length; j++) {
      let category = categories[j];
      object.leaderboard[timeInterval][category] = await queryData(
        timeInterval,
        category,
        order[j]
      );
    }
  }

  let meta = await Meta.findByIdAndUpdate(
    { _id: 1 },
    { ...object },
    { upsert: true, new: true }
  );

  return meta;
}

metaUpdate();

module.exports = { metaUpdate };
