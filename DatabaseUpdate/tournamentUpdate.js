const {
  getSwissTournaments,
} = require("../LichessAPI/getTeamSwissTournaments");
const { Tournament } = require("../Schemas/Tournament");

const { options } = require("../options");

async function tournamentUpdate() {
  let data = await getSwissTournaments(options.teamName, 999999);

  data = data
    .filter((element) => element.status == "finished")
    .map((element) => {
      let newObj = { ...element, _id: element.id };
      delete newObj.id;
      return newObj;
    });

  for (let i = 0; i < data.length; i++) {
    await Tournament.findByIdAndUpdate(data[i]._id, data[i], {
      new: true,
      upsert: true,
    });
  }
}

module.exports = { tournamentUpdate };
