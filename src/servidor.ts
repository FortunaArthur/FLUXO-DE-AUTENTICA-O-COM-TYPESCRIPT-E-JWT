import express from "express";
import {rota} from "./roteador"

const servidor = express();

// Middleware para JSON:
// Esse trecho configura o servidor para interpretar automaticamente o corpo das requisições como JSON, 
// útil para manipular dados enviados via POST ou PUT.
servidor.use(express.json());

servidor.use(rota)

servidor.listen(3333, () => console.log("Servidor local ligado no http://localhost:3333"));