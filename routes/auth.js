import express from "express";
import { check } from "express-validator";

// Mi validador de campos
import fieldValidators from "../middlewares/fieldValidators.js";
import validJwt from "../middlewares/validJwt.js";
// Mis controladores
import {
  loginUsuario,
  nuevoUsuario,
  renovarToken,
} from "../controller/auth.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "El campo name es obligatorio").not().isEmpty(),
    check("email", "El campo email es inválido").isEmail(),
    check("password", "El campo password es inválido").isLength({ min: 4 }),
    fieldValidators,
  ],
  nuevoUsuario
);

router.post(
  "/login",
  [
    check("email", "El campo email es inválido").isEmail(),
    check("password", "El campo password es inválido").isLength({ min: 4 }),
    fieldValidators,
  ],
  loginUsuario
);

router.get("/renew", validJwt, renovarToken);

export default router;
