import { Formik, Form } from "formik";
import TextInput from "./TextInput";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
	name: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const initialValues: FormValues = { name: "", password: "" };

	return (
		<div className="flex-1 grid place-items-center">
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					name: Yup.string()
						.min(5, "The name is too short")
						.required("Please provide name"),
					password: Yup.string().required("Please provide password"),
				})}
				onSubmit={({ name, password }, { setSubmitting, setErrors }) => {
					axios
						.post("/api/auth/login", {
							name,
							password,
						})
						.then((res) => {
							const {
								data: { token },
							} = res;

							localStorage.setItem("token", token);
						})
						.then(() => {
							setSubmitting(false);
							navigate("/");
						})
						.catch((err) => {
							const {
								data: { error },
							} = err.response;
							setErrors({ password: error });
							setSubmitting(false);
						});
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<TextInput label="Name:" type="text" name="name" />
						<TextInput label="Password:" type="password" name="password" />
						<button
							type="submit"
							disabled={isSubmitting}
							className="block mx-auto my-7 bg-yellow-300 text-white font-medium text-2xl py-2 px-5 rounded-full disabled:bg-slate-300"
						>
							Submit
						</button>
						<div className="text-center mt-8 underline-offset-2 underline text-slate-400">
							<Link to="/register">I don't have an account</Link>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
