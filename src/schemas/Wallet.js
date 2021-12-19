const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  privateKey: {
    type: String,
  },
  authType: {
    type: String,
    // required: true,
  },
  displayName: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("wallet", walletSchema);
// basicPayments= 0x7a79Db3cf9Fcf46Befb91a0f14057fc69c62DB64
