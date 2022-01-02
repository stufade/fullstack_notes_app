import express from "express";
import authorization from "../middlewares/authorization";
import {
	getAllNotes,
	addNote,
	deleteNote,
	getNote,
	changeNote,
} from "../controllers/notes";

const router = express.Router();

router.use(authorization);
router.route("/").get(getAllNotes).post(addNote);
router.route("/:id").delete(deleteNote).get(getNote).put(changeNote);

export default router;
