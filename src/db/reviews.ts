import mongoose, { Schema } from "mongoose";


const Reviewsschema = new mongoose.Schema({
    car_id: { type: String, required: true },
    user_id: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});


export const ReviewsModel = mongoose.model('Reviews', Reviewsschema);

export const getReviews =() => ReviewsModel.find();
export const getReviewByCarId = (carId :string) => ReviewsModel.find({ car_id: carId });
export const getReviewByUserId = (userId :string) => ReviewsModel.find({ user_id: userId });
export const createReview = (reviews: Record<string, any>) => ReviewsModel.create(reviews);
export const deleteReviewByUserId = (userId :string) => ReviewsModel.deleteMany({ user_id: userId });
export const deleteReviewByCarId = (carId :string) => ReviewsModel.deleteMany({ car_id: carId });
export const deleteReviewById = (id :string) => ReviewsModel.findByIdAndDelete({ _id: id });