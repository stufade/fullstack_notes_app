import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div
			onClick={handleClick}
			className="cursor-pointer text-center mt-8 underline-offset-2 underline text-slate-400 absolute top-0 right-3 md:right-16"
		>
			Logout
		</div>
	);
};

export default Logout;
