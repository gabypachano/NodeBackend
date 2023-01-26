import Product from "../../models/product.js";
import { connect, disconnect } from "../../database/index.js";

export const searchProduct = async (req, res) => {

    let {input} = req.params

    input = input.toString().toLowerCase();

    try{
    
        await connect();
        const products = await Product.find({
            $text: { $search: input }
        })
        .select('title images price inStock slug -_id')
        .lean();
        await disconnect();
     
        res.status(200).json(products)
    
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }