const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuario,
} = require("../controllers/usuarios");
const {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], getUsuarios);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);
router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,

    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("role", "el role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuarios
);

router.delete("/:id", [validarJWT], borrarUsuario);

module.exports = router;
