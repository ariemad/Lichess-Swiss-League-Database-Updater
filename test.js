const mongoose = require("mongoose");
const { tournamentUpdate } = require("./DatabaseUpdate/tournamentUpdate");
const { resultsUpdate } = require("./DatabaseUpdate/resultsUpdate");
const { playerUpdate } = require("./DatabaseUpdate/playerUpdate");
const { statsUpdate } = require("./DatabaseUpdate/statsUpdate");
const { metaUpdate } = require("./DatabaseUpdate/metaUpdate");

require("dotenv").config();

async function main() {
  try {
    //Mongo connection error handler
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    // Database Update

    await metaUpdate();

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Execute the main function immediately
main();
