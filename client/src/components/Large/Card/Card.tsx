import { Link } from "react-router-dom";
import "./card.scss";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { PiShower } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

interface CardProps {
	id: string;
	title: string;
	images: string[];
	bedroom: number;
	bathroom: number;
	price: number;
	address: string;
	latitude: string;
	longitude: string;
}

const Card = ({
	id,
	title,
	images,
	bedroom,
	bathroom,
	price,
	address,
}: CardProps) => {
	return (
		<div className="card">
			<Link to={`/${id}`} className="imageContainer">
				<img src={images[0]} alt="property image" />
			</Link>
			<div className="textContainer">
				<h2 className="title">
					<Link to={`/${id}`}> {title} </Link>
				</h2>
				<p className="address">
					<IoLocationOutline className="iconReact" />
					<span>{address}</span>
				</p>
				<p className="price">$ {price}</p>
				<div className="bottom">
					<div className="features">
						<div className="feature">
							<IoBedOutline className="iconReact" />
							<span>{bedroom}</span>
						</div>
						<div className="feature">
							<PiShower className="iconReact" />
							<span>{bathroom}</span>
						</div>
					</div>
					<div className="icons">
						<div className="icon">
							<FaRegBookmark className="iconReact" />
						</div>
						<div className="icon">
							<FaRegMessage className="iconReact" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
