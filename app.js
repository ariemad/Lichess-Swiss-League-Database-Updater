const mongoose = require("mongoose");
const { tournamentUpdate } = require("./DatabaseUpdate/tournamentUpdate");

require("dotenv").config();

//Connect to MongoDB

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");

  //Database Update
  tournamentUpdate();
});
