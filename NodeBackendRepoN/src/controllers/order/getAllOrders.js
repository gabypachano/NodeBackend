
import Order from '../../models/order.js'
import User from "../../models/user.js";
import { connect, disconnect } from "../../database/index.js";

export const getAllOrders = async (req, res) => {

try{

    await connect();
    const orders = await Order.find()
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email')
    .lean();
    await disconnect();
 
    res.status(200).json({orders})

}catch(error){
    await disconnect();
    console.log(error)
    return res.status(400).json({error:true, message:'Error inesperado, ver logs'})
}

}