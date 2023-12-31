import Express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers/index";



export const login = async (req: Express.Request, res: Express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                message: 'Please provide values for all required fields.',
                status: 400
            });
        }




        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user || !user.authentication) {
            return res.status(404).json({
                message: 'User not found.',
                status: 404
            });
        }
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(401).json({
                message: 'Invalid password.',
                status: 401
            });
        }




        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString());


        await user.save();

        res.cookie("APP-COOKIE", user.authentication.sessionToken, { domain: 'localhost', path: '/' });



        return res.status(200).json({
            message: 'Login successful.',
            status: 200,
            user
        }).end();

    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}




export const register = async (req: Express.Request, res: Express.Response) => {
    try {
        const { email, password, username, age, citizenship, sexe } = req.body;

        if (!email || !password || !username || !age || !citizenship || !sexe) {
            return res.json({
                message: 'Please provide values for all required fields.',
                status: 400
            });
        }

        const existingUser = await getUserByEmail(email);


        if (existingUser) {
            return res.json({
                message: 'User with this email or username already exists.',
                status: 400
            });
        }


        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
            age,
            citizenship,
            sexe,
            profile_pic_url: 'https://res.cloudinary.com/dhdjakjos/image/upload/v1704043714/user-profile-icon-avatar-or-person-vector-46431870_hmpabo.jpg',
        });

        return res.status(201).json({ message: 'User account created successfully.', user }).end();


    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}




export const logout = async (req: Express.Request, res: Express.Response) => {
    try {
        // const sessionToken = req.cookies["APP-COOKIE"];

        const sessionToken = req.cookies["APP-COOKIE"];

        if (sessionToken) {
            res.clearCookie("APP-COOKIE");

            return res.status(200).json({ message: 'Logout successful.' });
        } else {
            return res.status(401).json({ message: 'User is not logged in.' });
        }
    } catch (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ message: 'Internal Server Error. Unable to logout.' });
    }
};