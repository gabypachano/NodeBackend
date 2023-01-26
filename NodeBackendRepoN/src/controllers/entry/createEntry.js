import Entry from "../../models/entry.js";
import { connect, disconnect } from "../../database/index.js";

export const createEntry = async (req, res) => {

    const { description } = req.body;

    const newEntry = new Entry({
        description,
        index: 0,
        createdAt: Date.now(),
        status: "pending",
      });

    try{
    
        await connect();
        await newEntry.save();
        await disconnect();

        res.status(200).json({ result: newEntry });
        
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }