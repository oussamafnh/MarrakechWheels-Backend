import mongoose, { Schema } from "mongoose";


const Booking = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    car_id: { type: Schema.Types.ObjectId, ref: 'Cars', required: true },
    reservation_date: { type: Date, default: Date.now },
    reservation_time_start: { type: Date , required: true },
    reservation_time_end: { type: Date, required: true },
    total_price: { type: Number, required: true }
});


export const BookingModel = mongoose.model('Booking', Booking);

export const getBookings =() => BookingModel.find();
export const getBookingsByUserId = (userId :string) => BookingModel.find({ user_id: userId });
export const getBookingByCarId = (carId :string) => BookingModel.find({ car_id: carId });
export const getBookingByStartTime = (startTime :string) => BookingModel.find({ reservation_time_start : startTime });
export const getBookingByEndTime = (endTime :string) => BookingModel.find({ reservation_time_end : endTime });
export const deleteBookingById = (id :string) => BookingModel.findByIdAndDelete({ _id: id });