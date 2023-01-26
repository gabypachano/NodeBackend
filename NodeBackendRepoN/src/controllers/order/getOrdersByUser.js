import Order from '../../models/order.js'
import { connect, disconnect } from "../../database/index.js";
import { jwt } from '../../utils/index.js';

export const getOrdersByUser = async (req, res) => {

    console.log('ENTRA CON EL TOKEN');

const {token = ''} = req.body

console.log('ENTRA CON EL TOKEN', token);


try{
    const {userId} = await jwt.isValidToken(token)
    console.log('EL USER ES', userId);
    
    await connect();
    const orders = await Order.find({ user: userId }).lean();
    await disconnect();

    console.log('LAS ORDENES SON', orders)
    
    /* if ( !orders ) {
        return res.status(400).json({error:true, message:'Orden inexistente'})
    } */

    res.status(200).json({orders})

}catch(error){
    await disconnect();
    console.log(error)
    return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
}




}