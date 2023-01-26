import Product from "../../models/product.js";
import { connect, disconnect } from "../../database/index.js";

export const createProduct = async (req, res) => {

    const { images = [] } = req.body;

    console.log('se va a crear el producto',req.body)

    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'El producto necesita al menos 2 imágenes' });
    }

    try{
    
        await connect();
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if ( productInDB ) {
            await disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
        }
     
        const product = new Product( req.body );
        await product.save();
        await disconnect();

        res.status(201).json( product );

    
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }