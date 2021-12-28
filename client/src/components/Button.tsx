import React from "react";

interface AddButtonProps {
	onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ children, onClick }) => {
	return (
		<button
			className="
            bg-yellow-300 text-white font-bold py-2 px-6 text-xl rounded-full flex items-center
            transition-all duration-200 hover:transform hover:scale-[0.98]
            active:opacity-80
            "
			onClick={onClick}
		>
			{children}
		</button>
	);
};
