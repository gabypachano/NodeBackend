import Product from "../../models/product.js";
import { connect, disconnect } from "../../database/index.js";
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export const updateProduct = async (req, res) => {

    const { _id = '', images = [] } = req.body

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }
    
    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'Es necesario al menos 2 imágenes' });
    }

    try{
    
        await connect();
        const product = await Product.findById(_id);
        if ( !product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        // TODO: eliminar fotos en Cloudinary
        // https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg
       /*  product.images.forEach( async(image) => {
            if ( !images.includes(image) ){
                // Borrar de cloudinary
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                console.log({ image, fileId, extension });
                await cloudinary.uploader.destroy( fileId );
            }
        }); */

        
        console.log('se va a actualizar', product )

        //product.title = 'Accesorio'

        await product.updateOne( req.body ); 
        //await product.save()
        await disconnect();
     
        return res.status(200).json( product );
    
    }catch(error){
        await disconnect();
        console.log(error)
        return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
    }
    
    }