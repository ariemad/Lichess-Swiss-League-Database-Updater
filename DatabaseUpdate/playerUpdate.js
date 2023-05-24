const { Player } = require("../Schemas/Player");
const { Tournament } = require("../Schemas/Tournament");

async function playerUpdate() {
  //Find player that the player have not been updated

  let toBeUpdated = await Tournament.find({ playerUpdate: false });

  //Update or create all players

  let promises = [];
  for (let i = 0; i < toBeUpdated.length; i++) {
    for (let j = 0; j < toBeUpdated[i].results.length; j++) {
      let promise = (async () => {
        let doc = await Player.findByIdAndUpdate(
          toBeUpdated[i].results[j].username,
          {
            $push: { tournaments: toBeUpdated[i]._id },
          },
          { upsert: true, new: true }
        );
        return doc;
      })();
      promises.push(promise);
    }
    (async () => {
      await Tournament.findByIdAndUpdate(
        toBeUpdated[i]._id,
        { playerUpdate: true },
        { overwriteDiscriminatorKey: true }
      );
    })();
  }

  return Promise.all(promises);
}

module.exports = { playerUpdate };
