import Entry from '../models/entry.js'

export const deleteSourceEntry = (
    entries,
    sourceStatus,
    id
  ) => {
    let sourceEntriesUpdated = [];
  
    let sourceEntries = entries.filter(
      (entry) => entry.status === sourceStatus && String(entry._id) !== id
    );
  
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
        runValidators: true,
        new: true,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
  