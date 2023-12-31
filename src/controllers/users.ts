import express from 'express';
import {getUsers , deleteUserById , getUserById} from '../db/users';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}



export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser);
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}







export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        if (user && user.authentication) {
            user.username = username;
            user.email = email;
            user.authentication.password = password;

            const updatedUser = await user.save();
            return res.status(200).json(updatedUser);
        }

    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
