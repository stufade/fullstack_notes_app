import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NoteType from "../types/NoteType";
import { AddButton } from "./Button";

export const NoteScreen: React.FC = () => {
	const [note, setNote] = useState<NoteType>();
	const [error, setError] = useState<Error>();
	const { id } = useParams();
	const navigator = useNavigate();

	useEffect(() => {
		axios
			.get<NoteType>(`/api/notes/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(({ data }) => setNote(data))
			.catch((err: Error) => setError(err));
	}, [id]);

	if (error) {
		return <Navigate to="/" />;
	}

	if (!note) {
		return null;
	}

	const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setNote({ ...note, title: e.currentTarget.value });
	};

	const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setNote({ ...note, content: e.currentTarget.value });
	};

	const handleSaveChanges = async () => {
		await axios.put(
			`/api/notes/${id}`,
			{
				title: note.title,
				content: note.content,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);

		navigator("/");
	};

	const handleDiscardChanges = () => {
		navigator("/");
	};

	return (
		<div>
			<div className="flex gap-4 justify-center mt-10">
				<AddButton onClick={handleSaveChanges}>Save</AddButton>
				<AddButton onClick={handleDiscardChanges}>
					Discard Changes
				</AddButton>
			</div>
			<div className="min-w-[30%] max-w-[40rem] m-auto mt-10 shadow-md">
				<div>
					<input
						value={note.title}
						onChange={handleTitleChange}
						className="w-full focus:outline-none bg-yellow-300 font-bold text-white text-3xl px-5 py-3"
					/>
				</div>
				<div>
					<textarea
						value={note.content}
						onChange={handleContentChange}
						className="w-full resize-none focus:outline-none px-5 py-2 text-xl min-h-[50vh]"
						placeholder="Type here"
					/>
				</div>
			</div>
		</div>
	);
};
