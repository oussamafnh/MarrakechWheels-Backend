import mongoose from "mongoose";

const Agenciesschema = new mongoose.Schema({
    name:{type: "string"},
    location:{type: "string"},
    contact_email:{type: "string"},
    phone:{type: "string"}
});


export const AgenciesModel = mongoose.model('Agencies', Agenciesschema);


export const getAgencies =() => AgenciesModel.find();
export const getAgenciesByLocation =(location : string) => AgenciesModel.find({ location });
export const createAgencies = (values:Record<string, any>) => AgenciesModel.create(values);
export const updateAgencies = (values:Record<string, any>) => AgenciesModel.create(values);