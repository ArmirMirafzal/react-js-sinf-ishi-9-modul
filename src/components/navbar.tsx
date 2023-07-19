import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import { IEntity } from "types";

interface NavbarProps {
	user: IEntity.User;
	onLogout: () => void;
}

const paths = [
	{ pathname: "/login", title: "Login" },
	{ pathname: "/register", title: "Register" },
];

const Navbar = ({ user, onLogout }: NavbarProps) => (
	<nav className="navbar navbar-expand-sm bg-body-tertiary mb-3">
		<div className="container justify-content-start">
			<Link className="navbar-brand" to="/">
				Movies App
			</Link>
			{user ? (
				<ul className="navbar-nav d-flex">
					<li className="nav-item">
						<span className="nav-link">{user?.name}</span>
					</li>
					<li className="nav-item">
						<span className="nav-link" onClick={onLogout}>
							Log out
						</span>
					</li>
				</ul>
			) : (
				<ul className="navbar-nav d-flex">
					{paths.map(({ pathname, title }) => (
						<li key={pathname} className="nav-item">
							<NavLink
								to={pathname}
								className={({ isActive }) => cx("nav-link", isActive && "active")}
								children={title}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	</nav>
);

export default Navbar;
