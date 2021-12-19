const mongoose = require("mongoose");
const { Schema } = mongoose;

const depositsSchema = new Schema({
  sender: {
    type: String,
    required: true,
    unique: false,
  },
  amount: {
    type: String,
    required: true,
    unique: false,
  },
  tx: {
    type: String,
    require: true,
    unique: true,
  },
  status: {
    type: String,
    require: true,
    unique: false,
  },
});

module.exports = mongoose.model("deposits", depositsSchema);
