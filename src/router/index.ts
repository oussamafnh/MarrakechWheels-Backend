import express from "express";
import authentication from "./authentication";
import users from "./users";
import agencies from "./agencies";
import cars from "./cars";
import reviews from "./reviews";


const router = express.Router();


export default (): express.Router => {
    authentication(router);
    users(router);
    cars(router);
    agencies(router);
    reviews(router);


    return router;
}