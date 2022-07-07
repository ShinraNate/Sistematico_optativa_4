const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.set("useCreateIndex", true);

const centroSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = centroSchema;
