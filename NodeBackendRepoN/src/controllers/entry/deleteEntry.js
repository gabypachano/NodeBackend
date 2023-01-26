import Entry from "../../models/entry.js";
import { connect, disconnect } from "../../database/index.js";
import { deleteSourceEntry, updateEntries } from "../../utilsOpenJira/entry.js";

export const deleteEntry = async (req, res) => {
  const { entryId } = req.params;
  const { status } = req.body;


  try {
    await connect();

    const movedEntry = await Entry.findById(entryId);

    if (!movedEntry) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `Id: ${entryId} No encontrado en los registros` });
    }

    const entries = await Entry.find().sort({ index: "ascending" });

    await Entry.findByIdAndDelete(entryId);

    //Change entry's position index
    let entriesToBeUpdated = deleteSourceEntry(entries, status, entryId);

    updateEntries(entriesToBeUpdated);

    /* await disconnect(); */

    res.status(200).json({ message: `Proceso exitoso` });
  } catch (error) {
    await disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};
