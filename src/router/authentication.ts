import express from 'express';

import {login , register ,logout} from '../controllers/authentication';




export default (router :express.Router) => {
    router.post("/register", register);	
    router.post("/login", login);
    router.post("/logout", logout);
};
