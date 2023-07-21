import { Component } from "react";
import { config } from "config";
import { toast } from "react-hot-toast";
import Routes from "routes";
import { Auth } from "services";
import { IEntity } from "types";

import { Loader, Navbar } from "components";

interface AppState {
	user: IEntity.User;
	isLoading: boolean;
}

export default class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			user: null,
			isLoading: true,
		};
	}

	handleLogin = (user: IEntity.User) => {
		this.setState({ user });
	};

	handleLogout = () => {
		localStorage.removeItem(config.tokenKEY);
		this.setState({ user: null });
	};

	async componentDidMount() {
		const accessToken = localStorage.getItem(config.tokenKEY)!;

		try {
			if (accessToken) {
				const { data: user } = await Auth.GetMe();

				this.setState({ user, isLoading: false });
			}
		} catch (err: any) {
			localStorage.removeItem(config.tokenKEY);
			toast.error(err?.response?.data);
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		const { user, isLoading } = this.state;

		if (isLoading) return <Loader />;

		return (
			<>
				<Navbar onLogout={this.handleLogout} user={user} />
				<div className="container">
					<Routes onLogin={this.handleLogin} user={user} />
				</div>
			</>
		);
	}
}
