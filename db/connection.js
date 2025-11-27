const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("We are connected to the DB");
  } catch (error) {
    console.error(error);
  }
};
module.exports = { connectDB };
