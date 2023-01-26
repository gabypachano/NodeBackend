import Dish from "../../models/dish.js";
import { connect, disconnect } from "../../database/index.js";

export const createDish = async (req, res) => {
  const { name, description, category, price, imageUrl, inStock } = req.body;
  

  console.log('se va a guardar ',req.body )

  const newDish = new Dish({
    name,
    description,
    category,
    price,
    imageUrl,
    inStock
  });

  try {
    await connect();
    await newDish.save();
    await disconnect();

    res.status(200).json(newDish);
  } catch (error) {
    await disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};
