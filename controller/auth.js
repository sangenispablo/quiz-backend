import { request, response } from "express";
import bcrypt from "bcryptjs";

// importo funcion para generar JWT
import generarJWT from "../helpers/jwt.js";
// Modelo de Usuario
import User from "../models/User.js";

export const nuevoUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Esto tambien se podria sacar a un middleware
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "El email ya esta usado por otro usuario" });
    }
    user = new User(req.body);
    // Encripto password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    // Guardo el usuario
    await user.save();
    // Genero token
    const token = await generarJWT(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio en el servidor, contacte al administrador",
    });
  }
};

export const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, msg: "El email pertence a ningún usuario" });
    }
    // validamos las contraseñas
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "Error en las credenciales" });
    }
    // Genero token
    const token = await generarJWT(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio en el servidor, contacte al administrador",
    });
  }
};

export const renovarToken = async (req = request, res = response) => {
  // Genero token
  const token = await generarJWT(req.uid, req.name);
  res.json({ msg: "renew", token });
};
