import Dish from "../../models/dish.js";
import { connect, disconnect } from "../../database/index.js";

export const getAllDishes = async (req, res) => {

    const {onlyInStock = 'false'} = req.params
    let dishes = []
  
  try {
    await connect();
    if(onlyInStock === 'true'){
        console.log('en stock');
        dishes = await Dish.find({inStock:true});
    }else{
        console.log('fuera de stock');
        dishes = await Dish.find();
    }
    await disconnect();

    dishes.sort((x, y) => x.category.localeCompare(y.category));

    res.status(200).json(dishes);
  } catch (error) {
    await disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};