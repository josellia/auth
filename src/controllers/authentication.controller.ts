import express from 'express';
import { createUser, getUserByEmail } from './user.controllers';
import { random, authentication } from '../helpers';

// export const login = async(req: express.Request, res: express.Response) => {
//     try {
//         const {email, password} = req.body;

//         if(!email || !password) {
//             return res.sendStatus(400);
//         }


//         return res.sendStatus(400);
//     }
// }

export const register = async (req: express.Request, res: express.Response) => {
    const requiredFields = ['email', 'password', 'username'];
    const { email, password, username } = req.body;

    try {
        for (const field of requiredFields) {
            if (!req.body[field]) {
                res.send(`O campo ${field} é obrigatório`);
            }
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({msg: 'Este email já está cadastrado'});
        }

       
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}