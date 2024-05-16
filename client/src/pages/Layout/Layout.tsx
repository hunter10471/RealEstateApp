import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Medium/Navbar/navbar";
import "./layout.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Layout = () => {
	return (
		<div className="layout">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
};

export const RequireAuth = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);
	return (
		currentUser && (
			<div className="layout">
				<div className="navbar">
					<Navbar />
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		)
	);
};
