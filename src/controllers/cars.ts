import express from "express";
import { getCars , createCars } from "../db/cars";



export const getAllCars = async (req: express.Request, res: express.Response) => {
    try {
        const car = await getCars();
        return res.status(200).json(car);
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}



export const createCar = async (req: express.Request, res: express.Response) => {
    try {
        const{make , model , year , price , features , location ,pic_url, available_status , agency_id} = req.body;
        if (!make || !model || !year || !price || !features || !pic_url || !location || !agency_id) {
            return res.json({
                message: 'Please provide values for all required fields.',
                status: 400
            });
        }
        const car = await createCars({make , model , year , price , features , location , pic_url , available_status , agency_id});
        return res.status(201).json({car});        
    } catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}