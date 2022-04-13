import express from "express";
import { check } from "express-validator";
import {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controller/quiz.js";

// Mi validador de campos
import fieldValidators from "../middlewares/fieldValidators.js";
import validJwt from "../middlewares/validJwt.js";

const router = express.Router();

// como todas las rutas necesitan el validJwt uso lo siguiente
router.use(validJwt);
// rutas
router.get("/", getQuiz);
router.post(
  "/",
  [
    check("user", "El usuario es obligatorio").not().isEmpty(),
    check("topic", "El topico es obligatorio").not().isEmpty(),
    check("questions", "Debe tener al menos una pregunta").isArray().notEmpty(),
    check("questions.*.description", "Debe tener una descripción la pregunta")
      .not()
      .isEmpty(),
    check("questions.*.answers", "Debe tener al menos una respuesta")
      .isArray()
      .notEmpty(),
    fieldValidators,
  ],
  createQuiz
);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
