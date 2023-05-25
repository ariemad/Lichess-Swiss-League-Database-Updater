const moment = require("moment");

function getStartOfWeek() {
  return moment().clone().startOf("week").toISOString();
}

function getStartOfMonth() {
  return moment().clone().startOf("month").toISOString();
}

module.exports = { getStartOfWeek, getStartOfMonth };
