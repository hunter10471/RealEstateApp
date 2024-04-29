import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { ListData } from "../../../interfaces/data";
import { Link } from "react-router-dom";

interface PinProps {
	data: ListData;
}

const Pin = ({ data }: PinProps) => {
	return (
		<Marker position={[data.latitude, data.longitude]}>
			<Popup>
				<div className="popupContainer">
					<img src={data.img} alt="property image" />
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
