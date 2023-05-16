const {
  getSwissTournaments,
} = require("../LichessAPI/getTeamSwissTournaments");
const { Tournament } = require("../Schemas/Tournament");

const { options } = require("../options");

async function tournamentUpdate() {
  let data = await getSwissTournaments(
    options.teamName,
    options.tournamentsToCheck
  );

  //Data Process

  data = data
    .filter((element) => element.status == "finished")
    .map((element) => {
      let newObj = { ...element, _id: element.id };
      delete newObj.id;
      return newObj;
    });

  //Find new tournaments

  let promises = data.map(async (element) => {
    const doc = await Tournament.findById(element._id);

    if (!doc) {
      //ID not found
      return element;
    } else {
      return null;
    }
  });

  let newTournaments = (await Promise.all(promises)).filter(
    (element) => element != null
  );

  //Add new tournaments to database

  promises = newTournaments.map(async (element) => {
    const doc = await new Tournament(element).save();
    return doc;
  });

  return Promise.all(promises);
}

module.exports = { tournamentUpdate };
