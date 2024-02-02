import { NextFunction, Request, Response } from "express";
import { verify, Secret } from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}


export function autenticMiddlewares(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const {autorization} = req.headers;

        if (!autorization){
            return res.status(401).json({error: "Token Não Fornecida"})
        }

        const [, token] = (autorization as string).split(" ");

        const secretKey = process.env.MD5_Hash as Secret;


        try{
            const decode = verify(token, secretKey);
            const {id} = decode as TokenPayload;

            req.userId = id;
            next()
            
        } catch(error) {
            return res.status(401).json({ error: "Token Inválido" });

        }

    };