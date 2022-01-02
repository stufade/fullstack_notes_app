import NotesCollection from "./components/NotesCollection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NoteScreen } from "./components/NoteScreen";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Authorized from "./components/Authorized";

function App() {
	return (
		<Router>
			<div className="pt-16 pb-10 px-4 h-screen flex flex-col relative">
				<h1 className="text-6xl font-main text-center">
					Welcome to{" "}
					<span className="text-yellow-300 font-bold">Your</span>{" "}
					notes
				</h1>
				<Routes>
					<Route path="/" element={<Authorized />}>
						<Route index element={<NotesCollection />} />
						<Route path=":id" element={<NoteScreen />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
