import Entry from "../../models/entry.js";
import { connect, disconnect } from "../../database/index.js";

export const updateEntry = async (req, res) => {
  const { entryId } = req.params;

  try {
    await connect();
    const objEntry = await Entry.findById(entryId);

    if (!objEntry) {
      await disconnect();
      res
        .status(400)
        .json({
          message: `El id ${entryId} no se encontró en la base de datos`,
        });
    }

    const { description = objEntry?.description } = req.body;

    const updateEntry = await Entry.findByIdAndUpdate(
      entryId,
      { description },
      { runValidators: true, new: true }
    );

    res.status(400).json({ message: `Proceso exitoso` });
  } catch (error) {
    await disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};
