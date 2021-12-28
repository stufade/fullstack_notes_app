import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { NoteInterface } from "../../../types/NoteInterface";
import { AddButton } from "./Button";
import { Note } from "./Note";

const fetchAndSetNotes = (
	setNotes: React.Dispatch<React.SetStateAction<NoteInterface[]>>
) => {
	axios
		.get("/api/notes", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		.then(({ data }) => setNotes(data))
		.catch((err) => setNotes(err));
};

const NotesCollection: React.FC = () => {
	const token = localStorage.getItem("token");
	const authHeader = { Authorization: `Bearer ${token}` };
	const [notes, setNotes] = useState<NoteInterface[]>([]);

	useEffect(() => {
		fetchAndSetNotes(setNotes);
	}, [setNotes]);

	const handleAddNote = () => {
		axios.post("/api/notes", {}, { headers: authHeader }).then(() => {
			fetchAndSetNotes(setNotes);
		});
	};

	const createHandleDelete = (id: number) => {
		return async () => {
			axios
				.delete(`/api/notes/${id}`, { headers: authHeader })
				.then(() => {
					fetchAndSetNotes(setNotes);
				});
		};
	};

	if (!Array.isArray(notes)) {
		return <Navigate to="/register" />;
	}

	return (
		<div className="mt-10 flex flex-col items-center px-5">
			<AddButton onClick={handleAddNote}>
				<>
					<div className="mr-2">
						<img src="./plus.svg" alt="Plus" className="w-5" />
					</div>
					Add Note
				</>
			</AddButton>
			<div className="mt-10 flex flex-wrap justify-center">
				{notes?.map((item) => (
					<Note
						key={item.id}
						note={item}
						deleteNote={createHandleDelete(item.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default NotesCollection;
