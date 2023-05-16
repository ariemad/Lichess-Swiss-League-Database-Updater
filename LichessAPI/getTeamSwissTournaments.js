/**
 * Retrieves tournaments through the lichess API
 * 
 * Documentation: {@link https://lichess.org/api#tag/Swiss-tournaments/operation/apiTeamSwiss | Get team swiss tournaments}
 * @async
 * @param {string} teamID - The ID of the team.
 * @param {string} max - Number of tournaments to retrieve. Minimum 1
 *
 * @example
 * getSwissTournaments('chess-swiss-league', 1)
 *
 * [
    {
      id: 'qZmMntTt',
      createdBy: 'swissleague',
      startsAt: '2023-05-15T21:00:00Z',
      name: 'No Stop Swiss 124',
      clock: { limit: 300, increment: 3 },
      variant: 'standard',
      round: 0,
      nbRounds: 3,
      nbPlayers: 1,
      nbOngoing: 0,
      status: 'created',
      nextRound: { at: '2023-05-15T21:00:00Z', in: 679 },
      stats: null,
      rated: true
    }
  ]
 *
 */
async function getSwissTournaments(teamID, max) {
  try {
    let response = await fetch(
      `https://lichess.org/api/team/${teamID}/swiss?max=${max}`
    );

    //Check if response is 200
    if (response.status != 200) {
      throw new Error(
        `Response Status should be 200, but is ${response.status}`
      );
    }

    //Retrieve Data
    let text = (await response.text()).split("\n");
    text.pop(); //Remove empty string
    let data = text.map((element) => JSON.parse(element));
    return data;
  } catch (error) {
    console.log(
      `Occurred the following error in function ${arguments.callee.name}:`
    );
    console.log(error);
  }
}

module.exports = { getSwissTournaments };
