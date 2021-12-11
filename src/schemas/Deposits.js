const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  sender: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
    unique: false,
  },
  receiver: {
    type: String,
    required: true,
    unique: true,
  },
  tx:{ 
    type :String,
    require: true,
    unique: false,
  },
  status: {
      type: String,
        require: true,
        unique:false,
  }
});