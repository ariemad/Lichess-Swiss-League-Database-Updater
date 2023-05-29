const { getStartOfWeek, getStartOfMonth } = require("../utils/getStartOfWeek");
const { Player } = require("../Schemas/Player");
const { Tournament } = require("../Schemas/Tournament");

function calculateStats(tournaments, playerID) {
  let nbWins = 0;
  let rankSum = 0;
  let performanceSum = 0;
  let points = 0;
  let participation = tournaments.length;
  let isUpdated = true;

  for (let i = 0; i < tournaments.length; i++) {
    for (let j = 0; j < tournaments[i].results.length; j++) {
      let result = tournaments[i].results[j];
      if (result.username === playerID) {
        if (result.rank === 1) nbWins++;
        rankSum += result.rank;
        performanceSum += result.performance || 0;
        points += result.points;
        break;
      }
    }
  }

  let avgRank = Math.round((rankSum / (participation || 1)) * 10) / 10;
  let avgPerformance =
    Math.round((performanceSum / (participation || 1)) * 10) / 10;

  return {
    nbWins,
    avgRank,
    avgPerformance,
    participation,
    points,
    isUpdated,
  };
}

async function playerStatsUpdate(player) {
  //Get the tournaments the player participated

  let tournaments = await Tournament.find({ _id: { $in: player.tournaments } });

  //Calculate weekly, monthly and allTime stats

  if (!player.stats.weekly.isUpdated) {
    player.stats.weekly = calculateStats(
      tournaments.filter(
        (tournament) => tournament.startsAt.toISOString() > getStartOfWeek()
      ),
      player._id
    );
  }

  if (!player.stats.monthly.isUpdated) {
    player.stats.monthly = calculateStats(
      tournaments.filter(
        (tournament) => tournament.startsAt.toISOString() > getStartOfMonth()
      ),
      player._id
    );
  }

  if (!player.stats.allTime.isUpdated) {
    player.stats.allTime = calculateStats(tournaments, player._id);
  }

  //Save to database

  await player.save();
}
async function statsUpdate() {
  //Find players that stats are not updated

  let users = await Player.find({
    "stats.weekly.isUpdated": false,
    "stats.monthly.isUpdated": false,
    "stats.allTime.isUpdated": false,
  });

  for (let i = 0; i < users.length; i++) {
    await playerStatsUpdate(users[i]);
  }

  return users;
}

module.exports = { statsUpdate };
