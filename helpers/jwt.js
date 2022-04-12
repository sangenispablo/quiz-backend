import jwt from "jsonwebtoken";

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    console.log(payload);
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "3h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el Token");
        }
        resolve(token);
      }
    );
  });
};

export default generarJWT;
