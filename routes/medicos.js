const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarADMIN_ROLE } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicosById,
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, getMedicos);
router.post(
  "/",
  [
    validarJWT,
    validarADMIN_ROLE,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe de ser válido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);
router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe de ser válido").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", [validarJWT, validarADMIN_ROLE], borrarMedico);
router.get("/:id", [validarJWT, validarADMIN_ROLE], getMedicosById);

module.exports = router;
