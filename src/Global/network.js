
import express from 'express';
//subir dos carpetas arribas para que pueda funcionar.
import response from '../routes/response';
const router = express.Router();

//peticion get.
router.get("/", (req, res) => {
  console.log(req.body);
  response.success(req, res, "primer mensaje desde success");
});

//peticion post.
router.post("/", (req, res) => {
  console.log(req.body);
  response.success(req, res, "mensaje creado correctamente", 201);
});

//peticion delete con error simulado.
router.delete("/", (req, res) => {
  console.log(req.query);
  if (req.query.error == 'ok') {
    response.error(req, res, "Error simulado");
  } else {
    response.success(req, res, "mensajes eliminados", 201);
  }
});

//importacion de modulo router(rutas).
module.exports = router;
