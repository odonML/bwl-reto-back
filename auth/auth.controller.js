const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const SECRET_KEY = "clavesecreta123";

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    login: ""
  };

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000)
      return res.status(409).send("ese email ya existe");
    if (err) return res.status(500).send("Server Error");
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });

    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
      id: user.id
    };
    //response
    res.send({ dataUser });
  });
};

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send("server error!");
    if (!user) {
      //correo incorrecto
      res.status(409).send({ message: "correo esta mal" });
    } else {
      const resultPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );

      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn,
          login: "",
          id: user.id
        };
        //response
        res.send({ dataUser });
      } else {
        //password incorecto
        res.status(409).send({ message: "password esta mal" });
      }
    }
  });
};

exports.getUser = (req, res, next) => {
    User.find({}).then(user => {
        res.json(user);
    })
};

exports.updateUser = (req, res, next) => {
    const {id} = req.params;
    const fecha = req.body;
    const newFecha ={
      login: fecha.login
    }
    User.findByIdAndUpdate(id, newFecha, {new: true}).then(result =>{
      res.json(result);
    })
}