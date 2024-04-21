import Button from "../../Small/Button/Button";
import Logo from "../../Small/Logo/Logo";
import { IoMenu } from "react-icons/io5";
import "./navbar.scss";
import { useState } from "react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	const [open, setOpen] = useState(false);
	return (
		<nav>
			<div className="left">
				<Logo />
				<a href="/">Home</a>
				<a href="/">About</a>
				<a href="/">Contact</a>
				<a href="/">Agents</a>
			</div>
			<div className="right">
				<Button text="Sign In" />
				<Button isPrimary text="Sign Up" />
				<div onClick={() => setOpen(!open)} className="menuIcon">
					<IoMenu color="white" size={20} />
				</div>
			</div>
			<div className={open ? "menu active" : "menu"}>
				<a href="/">Home</a>
				<a href="/">About</a>
				<a href="/">Contact</a>
				<a href="/">Agents</a>
				<div className="button-group">
					<Button text="Sign In" />
					<Button isPrimary text="Sign Up" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
