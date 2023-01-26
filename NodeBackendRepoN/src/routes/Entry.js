import Router from "express";
import {createEntry} from '../controllers/entry/createEntry.js'
import {deleteEntry} from '../controllers/entry/deleteEntry.js'
import {getAllEntries} from '../controllers/entry/getAllEntries.js'
import {moveEntry} from '../controllers/entry/moveEntry.js'
import {updateEntry} from '../controllers/entry/updateEntry.js'

const router = Router();

router.post("/new", createEntry);
router.post("/all", getAllEntries);
router.post("/delete/:entryId", deleteEntry);
router.post("/update/:entryId", updateEntry);
router.post("/move/:entryId", moveEntry);


export default router;