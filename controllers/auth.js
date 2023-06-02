const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "email no encontrado" });
    }
    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "la contraseña no es válida" });
    }
    //Generar token-JWT

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
      msg: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

module.exports = { login };
