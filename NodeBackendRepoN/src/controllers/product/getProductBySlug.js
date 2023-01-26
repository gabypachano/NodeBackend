import Product from "../../models/product.js";
import { connect, disconnect } from "../../database/index.js";

export const getProductBySlug = async (req, res) => {

    const {slug} = req.params

    try{
    
        await connect();
        const product = await Product.findOne({ slug }).lean();
        await disconnect();
     
        res.status(200).json(product)
    
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }