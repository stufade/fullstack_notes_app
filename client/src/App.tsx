import NotesCollection from "./components/NotesCollection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NoteScreen } from "./components/NoteScreen";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Name from "./components/Name";

function App() {
	return (
		<Router>
			<div className="pt-16 pb-10 px-4 h-screen flex flex-col relative">
			<h1 className="text-6xl font-main text-center">
					Welcome to{" "}
					<span className="text-yellow-300 font-bold">Your</span>{" "}
					notes
				</h1>
				<Logout />
				<Routes>
					<Route path="/" element={<NotesCollection />} />
					<Route path="/:id" element={<NoteScreen />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
					<Route path="*/*" element={<Name />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
