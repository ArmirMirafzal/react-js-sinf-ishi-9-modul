import { toast } from "react-hot-toast";
import { Auth } from "services";

import { Form } from "components";

interface RegisterState {
	email: string;
	password: string;
	name: string;
}

interface RegisterProps {}

export default class Register extends Form<RegisterProps, RegisterState> {
	state: RegisterState = {
		email: "",
		password: "",
		name: "",
	};

	onSubmit = async ({ name, email, password }: RegisterState) => {
		try {
			await Auth.Register({ name, email, password });
			toast.success("Successfully registered");
		} catch (err: any) {
			toast.error(err?.response?.data);
		}
	};

	render() {
		return (
			<>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("name", "Name")}
					{this.renderInput("password", "Password", "password")}
					{this.renderSubmit("Register")}
				</form>
			</>
		);
	}
}
