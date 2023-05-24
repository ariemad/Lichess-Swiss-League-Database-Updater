const {
  getSwissTournaments,
} = require("../LichessAPI/getTeamSwissTournaments");
const { Tournament } = require("../Schemas/Tournament");

const { options } = require("../options");

async function tournamentUpdate() {
  //Get last tournaments

  let data = await getSwissTournaments(
    options.teamName,
    options.tournamentsToCheck
  );

  //Data Process

  data = data
    .filter((element) => element.status == "finished")
    .map((element) => {
      let newObj = { ...element, _id: element.id, resultsUpdate: false };
      delete newObj.id;
      return newObj;
    });

  promises = data.map(async (element) => {
    const doc = await Tournament.findByIdAndUpdate(
      element._id,
      { ...element },
      { upsert: true, new: true }
    );
    return doc;
  });

  return Promise.all(promises);
}

module.exports = { tournamentUpdate };
