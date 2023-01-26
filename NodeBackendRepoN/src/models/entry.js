import mongoose, { Model, Schema } from "mongoose";

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  index: {type: Number},
  status: {
    type: String,
    enum: {
      values: ["pending", "inProgress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
    default: 'pending'
  },
});

const EntryModel =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

  

  export default EntryModel;