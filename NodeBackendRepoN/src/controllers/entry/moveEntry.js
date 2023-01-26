import Entry from "../../models/entry.js";
import { connect, disconnect } from "../../database/index.js";

export const moveEntry = async (req, res) => {
  const { entryId } = req.params;

  const { action, sourceStatus, destStatus, destIndex } = req.body;

  try {
    await connect();
    const movedEntry = await Entry.findById(entryId);
    console.log('el ToDo movido es',movedEntry )
    console.log('columna destino:',destStatus )
    console.log('columna fuente,', sourceStatus)
    console.log('indice destino:',destIndex )

    if (!movedEntry) {
      /* await disconnect(); */
      return res
        .status(400)
        .json({ message: `Id: ${entryId} No encontrado en los registros` });
    }

    const entries = await Entry.find().sort({ index: "ascending" });
    console.log('los entries son: ',entries )

    let entriesToBeUpdated = [];

    if (sourceStatus === destStatus) {
      //When drag and drop an entry in the same column
      entriesToBeUpdated = moveEntriesDestColumn(
        entries,
        movedEntry,
        sourceStatus,
        destIndex,
        entryId
      );
    } else {
      //When drag and drop an entry between different columns
      let sourceEntriesUpdated = deleteSourceEntry(
        entries,
        sourceStatus,
        entryId
      );

      let destEntriesUpdated = moveEntriesDestColumn(
        entries,
        movedEntry,
        destStatus,
        destIndex,
        entryId
      );

      entriesToBeUpdated = [...sourceEntriesUpdated, ...destEntriesUpdated];
    }

    await updateEntries(entriesToBeUpdated);

    /* await disconnect(); */

    res.status(200).json({ message: "success" });
  } catch (error) {
    /* await disconnect(); */
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};

const moveEntriesDestColumn = (entries, movedEntry, status, destIndex, id) => {
  let movedEntries = entries.filter(
    (entry) => entry.status === status && String(entry._id) !== id
  );

  movedEntry.status = status;

  movedEntries.splice(Number(destIndex), 0, movedEntry);

  let entriesUpdated = movedEntries.map((entry, index) => {
    //New
    if(index === destIndex){
        index = index + 1
    }
    //
    entry.index = index;
    return entry;
  });

  return entriesUpdated;
};

export const deleteSourceEntry = (entries, sourceStatus, id) => {
  let sourceEntriesUpdated = [];

  let sourceEntries = entries.filter(
    (entry) => entry.status === sourceStatus && String(entry._id) !== id
  );

  console.log('los entries restantes en fuente son:',sourceEntries)

  if (sourceEntries) {
    sourceEntriesUpdated = sourceEntries.map((entry, index) => {
      entry.index = index;
      return entry;
    });
  }

  return sourceEntriesUpdated;
};

export const updateEntries = async (entries) => {
  let updateArray = [];

  console.log('las entries a actualizar son:',entries )

  entries.forEach((entry) => {
    updateArray.push(updateEntry(entry));
  });

  try {
    await Promise.all(updateArray);
  } catch (errors) {
    console.log(errors);
  }
};

const updateEntry = async (entry) => {
  try {
    await Entry.findByIdAndUpdate(entry._id, entry, {
     /*  runValidators: true,
      new: true, */
    });
  } catch (errors) {
    console.log(errors);
  }
};
