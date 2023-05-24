const { getResultsSwiss } = require("../LichessAPI/getResultsSwiss");
const { Tournament } = require("../Schemas/Tournament");
const { options } = require("../options");

async function resultsUpdate() {
  //Get tournaments that have { resultsUpdate: false }

  let toBeUpdated = await Tournament.find({ resultsUpdate: false });

  //Filter tournaments without players

  toBeUpdated = toBeUpdated.filter(
    (tournament) => tournament.results.length == 0
  );

  let results = new Array(toBeUpdated.length);

  // I use a for loop to avoid response.status = 429
  for (let i = 0; i < toBeUpdated.length; i++) {
    results[i] = await getResultsSwiss(toBeUpdated[i]._id);
  }

  let newDocs = toBeUpdated.map(async (tournament, index) => {
    let doc = await Tournament.findByIdAndUpdate(
      tournament._id,
      {
        results: results[index],
        resultsUpdate: true,
        playerUpdate: false,
      },
      { new: true, overwriteDiscriminatorKey: true }
    );
    return doc;
  });

  return Promise.all(newDocs);
}

module.exports = { resultsUpdate };
