import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { Home, Login, NewMovie, Register } from "pages";
import { IEntity } from "types";

interface RoutesProps {
	user: IEntity.User;
	onLogin: (user: IEntity.User) => void;
}

const Routes = ({ user, onLogin }: RoutesProps) => (
	<Switch>
		<Route path="" element={<Home user={user} />} />
		<Route path="new-movie" element={user ? <NewMovie /> : <Navigate to="/login" />} />
		<Route path="login" element={user ? <Navigate to="/" /> : <Login onLogin={onLogin} />} />
		<Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
		<Route path="*" element={<Navigate to="/" />} />
	</Switch>
);

export default Routes;
