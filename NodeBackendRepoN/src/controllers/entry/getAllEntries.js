import Entry from "../../models/entry.js";
import { connect, disconnect } from "../../database/index.js";

export const getAllEntries = async (req, res) => {

    try{
    
        await connect();
        const entries = await Entry.find().sort({ index: "ascending" });
        /* await disconnect(); */

        res.status(200).json({ result: entries });
        
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }