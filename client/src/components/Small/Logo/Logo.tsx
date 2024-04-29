import { Link } from "react-router-dom";
import "./logo.scss";
import { MdOutlineHomeWork } from "react-icons/md";

const Logo = () => {
	return (
		<Link className="logo" to={"/"}>
			<MdOutlineHomeWork size="40" />
			<span>HomeHarbor</span>
		</Link>
	);
};

export default Logo;
