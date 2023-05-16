/**
 * Retrieves a tournament results through the lichess API
 * 
 * Documentation: {@link https://lichess.org/api#tag/Swiss-tournaments/operation/resultsBySwiss | Get results of a swiss tournament}
 * @async
 * @param {string} tournamentID - The ID of the tournament.
 * @param {string} max - Number of players to retrieve. Minimum 1
 *
 * @example
 * getResultsSwiss("NLEaPiEE", 3)
 *
 * [
  {
    rank: 1,
    points: 2,
    tieBreak: 2,
    rating: 2113,
    username: 'graysunshine',
    performance: 2012
  },
  {
    rank: 2,
    points: 1,
    tieBreak: 0,
    rating: 1264,
    username: 'gigauser19',
    performance: 1613
  },
  {
    rank: 3,
    points: 1,
    tieBreak: 0,
    rating: 1760,
    username: 'Yayayaclassnaya',
    performance: 1539,
    absent: true
  }
]
 *
 */
async function getResultsSwiss(tournamentID, max) {
  try {
    let response = await fetch(
      `https://lichess.org/api/swiss/${tournamentID}/results?nb=${max}`
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

module.exports = { getResultsSwiss };
