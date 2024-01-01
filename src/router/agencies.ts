import express from 'express';
import { getAllAgencies , createAgency } from '../controllers/agencies';


export default (router :express.Router) => {
    router.get("/agencies", getAllAgencies);
    router.post("/agencies", createAgency);
};