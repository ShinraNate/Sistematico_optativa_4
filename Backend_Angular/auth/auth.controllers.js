const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "matangadijolachanga";

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  };

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000)
      return res.status(409).send("El correo ya existe");

    if (err) return res.status(500).send("Error de servidor");
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: User.id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });
    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
    };
    //Response
    res.send({ dataUser });
  });
};

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send("Error de servidor!");
    if (!user) {
      //email no existe
      res.status(409).send({ message: "Algo pasó mal" });
    } else {
      const resultPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );
      if (resultPassword) {
        const expireIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expireIn,
        });
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expireIn: expireIn,
        };

        res.send({ dataUser });
      } else {
        //password equivocada
        res.status(409).send({ message: "Contraseña incorrecta" });
      }
    }
  });
};
