import { config } from "config";
import { toast } from "react-hot-toast";
import { Auth, AxiosError } from "services";
import { IApi, IEntity } from "types";
import * as yup from "yup";

import { Form } from "components";

interface LoginState extends IApi.Auth.Login.Request {
	errors: Partial<IApi.Auth.Login.Request>;
}

interface LoginProps {
	onLogin: (user: IEntity.User) => void;
}

export default class Login extends Form<LoginProps, LoginState> {
	schema = yup.object({
		email: yup.string().email().label("Email").required(),
		password: yup.string().min(5).trim().label("Password"),
	});

	state: LoginState = {
		email: "",
		password: "",
		errors: {},
	};

	onSubmit = async ({ email, password }: LoginState) => {
		try {
			const { data } = await Auth.Login({ email, password });
			const accessToken = data.data;

			localStorage.setItem(config.tokenKEY, accessToken);
			const { data: user } = await Auth.GetMe();

			toast.success(`Hi 👋🏻, ${user?.name}`);
			this.props.onLogin(user);
		} catch (err: any) {
			if (err instanceof AxiosError) {
				toast.error(err?.response?.data);
			}
		}
	};

	render() {
		return (
			<>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email", "email")}
					{this.renderInput("password", "Password", "password")}
					{this.renderSubmit("Login")}
				</form>
			</>
		);
	}
}
