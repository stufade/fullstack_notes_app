import { ErrorMessage, Field, FieldAttributes } from "formik";
import React from "react";

interface Props {
	label: string;
}

const TextInput: React.FC<Props & FieldAttributes<any>> = ({
	label,
	...props
}) => {
	return (
		<>
			<label className="block text-xl px-3 my-5 font-medium">{label}</label>
			<Field {...props} className="border-b-2 border-black px-3 py-2 text-2xl focus:outline-2" />
			<ErrorMessage name={props.name} component="div" className="text-lg font-medium text-red-500 mt-3 mx-3" />
		</>
	);
};

export default TextInput;
