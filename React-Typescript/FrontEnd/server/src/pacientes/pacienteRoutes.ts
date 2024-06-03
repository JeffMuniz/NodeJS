import { Router } from "express";
import { verificaTokenJWT } from "../auth/verificaTokenJWT.js";

import {
  lerPacientes,
  criarPaciente,
  lerPaciente,
  atualizarPaciente,
  desativaPaciente,
  atualizarEnderecoPaciente,
  listaConsultasPaciente,
} from "./pacienteController.js";
import { Role } from "../auth/roles.js";

export const pacienteRouter = Router();

pacienteRouter.get("/", lerPacientes);
pacienteRouter.post("/", criarPaciente);
pacienteRouter.get("/:id", lerPaciente);
pacienteRouter.get("/:id/consultas", listaConsultasPaciente);
pacienteRouter.put("/:id", verificaTokenJWT(Role.paciente), atualizarPaciente);
pacienteRouter.delete(
  "/:id",
  verificaTokenJWT(Role.paciente),
  desativaPaciente
);
pacienteRouter.patch(
  "/:id",
  verificaTokenJWT(Role.paciente),
  atualizarEnderecoPaciente
);
export default (app) => {
  app.use("/paciente", pacienteRouter);
};


var express = require('express');
var app = express();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/:path', function(req, res) {
  let path = req.params.path;
  if (isValidPath(path))
    res.sendFile(path);
});