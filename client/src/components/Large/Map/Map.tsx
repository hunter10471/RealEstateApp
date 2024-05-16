import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../../Small/Pin/Pin";
import { Post } from "../../../interfaces/post.interface";

interface MapProps {
	data: Post[];
}

const Map = ({ data }: MapProps) => {
	return (
		<MapContainer
			className="map"
			center={[30.3753, 69.3451]}
			zoom={5}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{data.map((item) => (
				<Pin data={item} key={item.id} />
			))}
		</MapContainer>
	);
};

export default Map;
