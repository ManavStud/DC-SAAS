const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      useNewUrlParser: true,
    };
    await mongoose.connect(
      "mongodb+srv://japneetrajput:deepcytes@redteaming.5qy3qyl.mongodb.net/",
      DB_OPTIONS
    );
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
