const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    total,
    usuarios,
  });
};

const crearUsuarios = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const usuario = new Usuario(req.body);
    //Encriptar caontraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // JWT
    const token = await generarJWT(usuario.id);
    //Guardar usuario
    await usuario.save();

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const actualizarUsuarios = async (req, res) => {
  //TODO: validar token
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      res.status(404).json({ ok: false, msg: "EL usario no existe" });
    }
    //actualizar
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con este email",
        });
      }
    }
    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuarios de google no puede cambiar su correo",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.statu(500).json({ ok: false, msg: "Error inesperado" });
  }
};

const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "EL usario no existe" });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      uid,
      msg: "Usuarios borrado correctemente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

module.exports = {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuario,
};
