import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import { Post } from "../../../interfaces/post.interface";

interface PinProps {
	data: Post;
}

const Pin = ({ data }: PinProps) => {
	return (
		<Marker
			position={
				data.images.length > 1
					? [+data.latitude, +data.longitude]
					: [30.3753, 69.3451]
			}
		>
			<Popup>
				<div className="popupContainer">
					<img src={data.images[0]} alt="property image" />
					<div className="textContainer">
						<Link to={`/${data.id}`}>{data.title}</Link>
						<span className="bed">{data.bedroom} bedroom</span>
						<b>$ {data.price}</b>
					</div>
				</div>
			</Popup>
		</Marker>
	);
};

export default Pin;
