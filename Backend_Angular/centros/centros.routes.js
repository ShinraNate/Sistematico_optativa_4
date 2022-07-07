const Centros = require("./centros.controllers");
module.exports = (router) => {
  router.post("/registercentros", Centros.createCentro);
};
