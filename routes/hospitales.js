const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarADMIN_ROLE } = require("../middlewares/validar-jwt");
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", [], getHospitales);
router.post(
  "/",
  [
    validarJWT,
    validarADMIN_ROLE,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);
router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  actualizarHospital
);

router.delete("/:id", [validarJWT, validarADMIN_ROLE], borrarHospital);

module.exports = router;
