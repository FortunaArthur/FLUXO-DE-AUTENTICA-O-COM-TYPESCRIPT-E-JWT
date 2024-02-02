import { compare } from "bcryptjs";
import { prisma } from "../utils/regraPrisma";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

export class autenticateControle {
    
    async autenticate(req:Request, res: Response){

        const {email, senha} = req.body;

        // Verificar se existe o Email
        const usuario = await prisma.usuario.findUnique({where: {email}});

        if(!usuario){
            return res.json({error: "Usuario Não Encontrado"})
        }

        // Verificar a senha
        const compare_senha = await compare(senha, usuario.senha);

        if(!compare_senha){
            return res.json({error: "Senha Invalida"})
        }

        // Se existir um Usuario(email) e se Existir uma Senha que seja a mesma do usuario
        // se devolve um  token de autenticação
                                            // isso aki é uma chave secreta da aplicação, só sua aplicação pode saber
        const token = sign({ id: usuario.id }, process.env.MD5_Hash || '', { expiresIn: "1d" });

        // so desestruturando
        const {id} = usuario;

        return res.json({usuario:{id, email}, token});
    }
};