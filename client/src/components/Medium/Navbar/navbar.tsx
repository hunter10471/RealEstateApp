import Button from "../../Small/Button/Button";
import Logo from "../../Small/Logo/Logo";
import { IoMenu } from "react-icons/io5";
import "./navbar.scss";
import { useContext, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	const [open, setOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const { width } = useWindowSize();
	const navigate = useNavigate();

	useEffect(() => {
		if (width && width > 760) {
			setOpen(false);
		}
	}, [width, window.scrollY]);

	return (
		<nav>
			<div className="left">
				<Logo />
				<Link to={`/`}>Home</Link>
				<Link to={`/`}>About</Link>
				<Link to={`/`}>Contact</Link>
				<Link to={`/`}>Agents</Link>
			</div>
			<div className="right">
				{currentUser ? (
					<div className="user">
						<img src={currentUser.avatar || "/assets/avatar.png"} alt="" />
						<span>{currentUser.username}</span>
						<Link className="profile" to={"/profile"}>
							Profile
							<div className="notification">3</div>
						</Link>
					</div>
				) : (
					<>
						<Button onClick={() => navigate("/login")} text="Sign In" />
						<Button
							isPrimary
							onClick={() => navigate("/register")}
							text="Sign Up"
						/>
					</>
				)}
				<div onClick={() => setOpen(!open)} className="menuIcon">
					<IoMenu color="white" size={20} />
				</div>
			</div>
			<div className={open ? "menu active" : "menu"}>
				<Link to={`/`}>Home</Link>
				<Link to={`/`}>About</Link>
				<Link to={`/`}>Contact</Link>
				<Link to={`/`}>Agents</Link>

				<div className="button-group">
					<Button text="Sign In" />
					<Button isPrimary text="Sign Up" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
