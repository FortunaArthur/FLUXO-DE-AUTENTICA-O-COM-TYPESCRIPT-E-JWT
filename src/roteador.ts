import { Router } from "express";
import { controleUsuario} from "./controller/controleUsuario";
import { autenticateControle } from "./controller/controleAutentic";
import { autenticMiddlewares } from "./middleware/autentic";

const usuarioControle = new controleUsuario();
const controleAutenticate = new autenticateControle();

export const rota = Router();

// CRUD
rota.post("/criar", usuarioControle.criar); // cria usuario
rota.get("/lista", autenticMiddlewares, usuarioControle.ler) // lista todos so usuarios e tem a auatenticação
rota.post("/autenticar", controleAutenticate.autenticate) // autenticar o email e senha
