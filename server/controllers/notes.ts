import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { Note } from "../entities/Note";
import CustomError from "../errors/CustomError";

export const getAllNotes = async (req: Request, res: Response) => {
	const user = req.user;

	const notes = await getConnection().manager.find(Note, { user });

	res.json(notes);
};

export const addNote = async (req: Request, res: Response) => {
	const user = req.user;

	const note = new Note();
	note.user = user;
	await getConnection().manager.save(note);

	res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
	const { id: noteID } = req.params;
	const user = req.user;

	const info = await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Note)
		.where("id = :id", { id: noteID, user })
		.execute();

	res.json(info);
};

export const getNote = async (req: Request, res: Response) => {
	const user = req.user;
	const { id: noteID } = req.params;

	const note = await getConnection().manager.findOne(Note, { id: +noteID, user });

	if (!note) {
		throw new CustomError("No task with this id", 404);
	}

	res.json(note);
};

export const changeNote = async (req: Request, res: Response) => {
	const user = req.user;
	const { id: noteID } = req.params;
	const { title, content } = req.body;

	const note = await getConnection().manager.findOne(Note, { id: +noteID, user });

	if (!note) {
		res.status(404).send("No such task");
		return;
	}

	note.title = title;
	note.content = content;

	await getConnection().manager.save(note);

	res.json(note);
};
