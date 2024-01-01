import express from "express";
import { getAllCars , createCar } from "../controllers/cars";


export default (router :express.Router) => {
    router.get("/cars", getAllCars);
    router.post("/cars", createCar);
}