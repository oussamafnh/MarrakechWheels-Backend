import mongoose, { Schema } from "mongoose";

import { AgenciesModel } from "./agencies";



const carFeaturesSchema = new mongoose.Schema({
    horsepower: { type: String, required: true },
    torque: { type: String, required: true },
    acceleration: { type: String, required: true },
    transmission: { type: String, required: true },
});


const Carsschema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    features: { type: carFeaturesSchema, required: true },
    location: { type: String, required: true },
    pic_url: { type: String ,required: true},
    available_status: { type: Boolean , default: true },
    agency_id: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
});


export const CarsModel = mongoose.model('Cars', Carsschema);


export const getCars = () => CarsModel.find();

export const getCarsByLocation = (location: string) => CarsModel.find({ location });

export const createCars = (values: Record<string, any>) => CarsModel.create(values);

export const updateCars = (values: Record<string, any>) => CarsModel.create(values);

export const deleteCarsById = (id: string) => CarsModel.findByIdAndDelete({ _id: id });

export const updateCarsById = (id: string, values: Record<string, any>) => CarsModel.findByIdAndUpdate(id, values);

