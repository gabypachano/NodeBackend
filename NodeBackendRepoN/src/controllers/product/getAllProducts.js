import Product from "../../models/product.js";
import { connect, disconnect } from "../../database/index.js";

export const getAllProducts = async (req, res) => {

    try{
    
        await connect();
        const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();
        await disconnect();
     
        res.status(200).json({products})
    
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }