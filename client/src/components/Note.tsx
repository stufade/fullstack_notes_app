import { useNavigate } from "react-router-dom";
import NoteType from "../types/NoteType";

interface NoteProps {
	note: NoteType;
	deleteNote: () => void;
}

const maxContentLength = 100;

export const Note: React.FC<NoteProps> = ({
	note: { content, title, id },
	deleteNote,
}) => {
	const navigate = useNavigate();

	const sliceContent = (s: string) => {
		if (s.length <= maxContentLength) {
			return s;
		}
		return content.substring(0, 100) + "...";
	};

	return (
		<div className="w-[19rem] shadow rounded-lg mx-4 mb-8">
			<div className="font-bold bg-yellow-300 py-1 px-3 text-white text-xl flex justify-between">
				<div className="cursor-default">{title}</div>
				<button className="ml-4" onClick={deleteNote}>
					<img src="./delete.svg" alt="del" className="w-5" />
				</button>
			</div>
			<div
				className="px-3 py-3 font-main text-xl cursor-pointer min-h-[14rem]"
				onClick={() => navigate(`/${id}`)}
			>
				{sliceContent(content)}
			</div>
		</div>
	);
};
