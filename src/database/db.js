// Export mongoose
const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var db_path = process.env.DB_PATH;

// Declare a variable named option and assign optional settings
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(db_path, config).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  },
);
