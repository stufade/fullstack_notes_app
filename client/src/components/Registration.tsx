import { Formik, Form } from "formik";
import TextInput from "./TextInput";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
	name: string;
	password: string;
	confirmPassword: string;
}

const Registration: React.FC = () => {
	const navigate = useNavigate();
	const initialValues: FormValues = {
		name: "",
		password: "",
		confirmPassword: "",
	};

	return (
		<div className="flex-1 grid place-items-center">
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					name: Yup.string()
						.min(5, "Name is too short")
						.max(20, "Name is too long")
						.required("Please provide name"),
					password: Yup.string()
						.required("Please provide password")
						.min(5, "Password is too short")
						.max(30, "Password is too long"),
					confirmPassword: Yup.string()
						.when("password", {
							is: (val: string) =>
								val && val.length > 0 ? true : false,
							then: Yup.string().oneOf(
								[Yup.ref("password")],
								"Password mismatch"
							),
						})
						.required("Please confirm password"),
				})}
				onSubmit={(
					{ name, password },
					{ setSubmitting, setErrors }
				) => {
					axios
						.post("/api/auth/register", {
							name,
							password,
						})
						.then((res) => {
							const {
								data: { token },
							} = res;

							localStorage.setItem("token", token);

							navigate("/");
						})
						.catch((err) => {
							const {
								data: { error },
							} = err.response;
							setErrors({ name: error });
						})
						.then(() => setSubmitting(false));
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<TextInput label="Name:" type="text" name="name" />
						<TextInput
							label="Password:"
							type="password"
							name="password"
						/>
						<TextInput
							label="Confirm Password:"
							type="password"
							name="confirmPassword"
						/>
						<button
							type="submit"
							disabled={isSubmitting}
							className="block mx-auto my-7 bg-yellow-300 text-white font-medium text-2xl py-2 px-5 rounded-full disabled:bg-slate-300"
						>
							Submit
						</button>
						<div className="text-center mt-8 underline-offset-2 underline text-slate-400">
							<Link to="/login">I already have an account</Link>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Registration;
