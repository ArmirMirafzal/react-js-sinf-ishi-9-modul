import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { CreateMovie, Home, Login, Register } from "pages";
import { IEntity } from "types";

interface RoutesProps {
	user: IEntity.User;
	onLogin: (user: IEntity.User) => void;
}

const Routes = ({ user, onLogin }: RoutesProps) => (
	<Switch>
		<Route path="/movies">
			<Route index element={<Home user={user} />} />
			<Route path="create" element={user ? <CreateMovie /> : <Navigate to="/login" />} />
		</Route>

		<Route path="login" element={user ? <Navigate to="/movies" /> : <Login onLogin={onLogin} />} />
		<Route path="register" element={user ? <Navigate to="/movies" /> : <Register />} />
		<Route path="*" element={<Navigate to="/movies" />} />
	</Switch>
);

export default Routes;
