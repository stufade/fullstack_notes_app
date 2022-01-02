import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NoteType from "../types/NoteType";
import { AddButton } from "./Button";
import { Note } from "./Note";
const NotesCollection: React.FC = () => {
	const token = localStorage.getItem("token");
	const authHeader = { Authorization: `Bearer ${token}` };

	const [notes, setNotes] = useState<NoteType[]>([]);
	const [error, setError] = useState<Error>();

	const fetchAndSetNotes = async () => {
		await axios
			.get<NoteType[]>("/api/notes", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(({ data }) => setNotes(data))
			.catch((err: Error) => setError(err));
	};

	useEffect(() => {
		fetchAndSetNotes();
	}, []);

	const handleAddNote = () => {
		axios.post("/api/notes", {}, { headers: authHeader }).then(() => {
			fetchAndSetNotes();
		});
	};

	const createHandleDelete = (id: number) => {
		return async () => {
			axios
				.delete(`/api/notes/${id}`, { headers: authHeader })
				.then(() => {
					fetchAndSetNotes();
				});
		};
	};

	if (error) {
		return <Navigate to="/register" />;
	}

	return (
		<div className="flex flex-col items-center px-5">
			<div className="mt-10">
				<AddButton onClick={handleAddNote}>
					<>
						<div className="mr-2">
							<img src="./plus.svg" alt="Plus" className="w-5" />
						</div>
						Add Note
					</>
				</AddButton>
			</div>
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
