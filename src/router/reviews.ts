import express from 'express';

import {getAllReviews,createAReview,deleteReview} from '../controllers/reviews';

import { isAuthenticated , isOwner} from '../middlewares/index';


export default (router :express.Router) => {
    router.get("/reviews", isAuthenticated, getAllReviews);
    router.delete("/reviews/:id", isAuthenticated,isOwner, deleteReview);
    router.post("/reviews", isAuthenticated, createAReview);
};
