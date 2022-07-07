const mongoose = require("mongoose");
const centroSchema = require("./centros.model");

centroSchema.statics = {
  create: function (data, cb) {
    const centro = new this(data);
    centro.save(cb);
  },
};

const centroModel = mongoose.model("Centros", centroSchema);
module.exports = centroModel;
