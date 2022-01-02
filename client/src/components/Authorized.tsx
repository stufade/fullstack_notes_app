import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Logout from "./Logout";

const Authorized = () => {
	const [username, setUsername] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!token) return;
		axios
			.get<{ user: { name: string } }>("/api/user/name", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(({ data }) => setUsername(data.user.name));
	});

	return (
		<>
			<Logout />
			<div className="text-6xl font-main text-center mt-5 font-light">
				{username}
			</div>
			<Outlet />
		</>
	);
};

export default Authorized;
