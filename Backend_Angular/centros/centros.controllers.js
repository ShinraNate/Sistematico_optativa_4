const Centro = require("./centros.dao");
const jwt = require("jsonwebtoken");

exports.createCentro = (req, res, next) => {
  const newCentro = {
    name: req.body.name,
    addres: req.body.address,
  };

  Centro.create(newCentro, (err, centro) => {
    if (err && err.code === 11000)
      return res.status(409).send("El Centro ya existe");

    if (err) return res.status(500).send("Error de servidor");
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: Centro.id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });
    const dataCentro = {
      name: centro.name,
      address: centro.address,
      accessToken: accessToken,
      expiresIn: expiresIn,
    };
    //Response
    res.send({ dataCentro });
  });
};
