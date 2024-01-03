import express from 'express';
import { get } from "lodash";
import { getReviews , getReviewByCarId , getReviewByUserId , createReview , deleteReviewById , deleteReviewByUserId } from '../db/reviews';
import {getUserById } from '../db/users';


export const getAllReviews = async (req: express.Request, res: express.Response) => {
    try {
        const reviews = await getReviews();

        // Map reviews to include user info
        const reviewsWithUsers = await Promise.all(reviews.map(async review => {
            const user = await getUserById(review.user_id);
            return {
                review,
                user
            };
        }));

        return res.status(200).json(reviewsWithUsers);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}



export const createAReview = async (req: express.Request, res: express.Response) => {
    try {
        const { car_id, rating, comment } = req.body;
        const user_id = get(req, "identity._id") as unknown as string;

        // Assuming getUserById returns a Promise resolving to the user object
        const user = await getUserById(user_id);

        if (!car_id || !rating || !comment || !user) {
            return res.status(400).json({
                message: 'Please provide values for all required fields.',
                status: 400,
            });
        }

        const review = await createReview({
            car_id,
            user_id,
            user_name: user.username, // Assuming 'username' is a property of the user object
            rating,
            comment,
        });

        return res.status(201).json({ review, user });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};



export const deleteReview  = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedReview = await deleteReviewById(id);
        return res.status(200).json(deletedReview);
    } catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}