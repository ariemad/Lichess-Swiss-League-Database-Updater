const { getResultsSwiss } = require("../LichessAPI/getResultsSwiss");
const { Tournament } = require("../Schemas/Tournament");
const { options } = require("../options");

async function resultsUpdate() {
  //Get last tournaments from DB

  let recentTournaments = await Tournament.find({})
    .sort({ startsAt: -1 })
    .limit(options.tournamentsToCheck);

  //Filter tournaments without players

  recentTournaments = recentTournaments.filter(
    (tournament) => tournament.results.length == 0
  );

  let results = new Array(recentTournaments.length);

  // I use a for loop to avoid response.status = 429
  for (let i = 0; i < recentTournaments.length; i++) {
    results[i] = await getResultsSwiss(recentTournaments[i]._id);
  }

  let newDocs = recentTournaments.map(async (tournament, index) => {
    let doc = await Tournament.findByIdAndUpdate(
      tournament._id,
      {
        results: results[index],
      },
      { new: true }
    );
    return doc;
  });

  return Promise.all(newDocs);
}

module.exports = { resultsUpdate };
