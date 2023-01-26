
import Order from '../../models/order.js'
import { connect, disconnect } from "../../database/index.js";
import { isValidObjectId } from 'mongoose';

export const getOrder = async (req, res) => {

const {orderId} = req.params

if ( !isValidObjectId(orderId) ){
    return res.status(400).json({error:true, message:'No es ID válido'})
}
try{

    await connect();
    const order = await Order.findById( orderId ).lean();
    await disconnect();
    
    if ( !order ) {
        return res.status(400).json({error:true, message:'Orden inexistente'})
    }

    res.status(200).json({order})

}catch(error){
    await disconnect();
    console.log(error)
    return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
}




}