const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    if (process.env.NODE_ENV_MODE === "production") {
      mongoose.connect(process.env.MONGO_URI);
    } else {
      mongoose.connect(process.env.MONGO_URI_DEV);
    }
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Unable to connect database", error);
  }
};

module.exports = dbConnect;
