import mongoose, { Model, Schema } from "mongoose";

const dishSchema = new Schema({
  name: {type:String},
  description: { type: String, required: true },
  category: { type: String },
  price : {type:String},
  imageUrl: {type: String},
  inStock: {type:Boolean}
},{
    timestamps: true
});

const DishModel =
  mongoose.models.Dish || mongoose.model("Dish", dishSchema);

  

  export default DishModel;