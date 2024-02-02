import { hash } from "bcryptjs";
import { prisma } from "../utils/regraPrisma";
import { Request, Response } from "express";

export class controleUsuario {
    // criar
    async criar(req:Request, res: Response){

        const {nome, email, senha} = req.body;
        // criptografia entra aki
        const senha_hash = await hash(senha, 8);

        const usuario = await prisma.usuario.create({
            data:{nome, email, senha: senha_hash}
        })

        return res.json({usuario});
    }

    // ler/listar
    async ler(req:Request, res:Response){
        const usuarios = await prisma.usuario.findMany();
        return res.json({usuarios})
    }
};