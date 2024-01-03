import express from 'express';
import { createAgencies ,getAgencies} from '../db/agencies';

export const createAgency = async (req: express.Request, res: express.Response) => {
    try {
        const{name, location, contact_email, phone} = req.body;
        if (!name ||!location ||!contact_email ||!phone ) {
            return res.json({
                message: 'Please provide values for all required fields.',
                status: 400
            });
        }
        const agency = await createAgencies({name, location, contact_email, phone});
        return res.status(201).json({agency});        
    } catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getAllAgencies = async (req: express.Request, res: express.Response) => {
    try {
        const agencies = await getAgencies();
        return res.status(200).json(agencies);
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}
