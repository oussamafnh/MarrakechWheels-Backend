import express from "express";
import authentication from "./authentication";
import users from "./users";
import agencies from "./agencies";
import cars from "./cars";


const router = express.Router();


export default (): express.Router => {
    authentication(router);
    users(router);
    cars(router);
    agencies(router);



    return router;
}