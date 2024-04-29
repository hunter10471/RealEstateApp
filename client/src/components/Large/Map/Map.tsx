import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import { ListData } from "../../../interfaces/data";
import Pin from "../../Small/Pin/Pin";

interface MapProps {
	data: ListData[];
}

const Map = ({ data }: MapProps) => {
	return (
		<MapContainer
			className="map"
			center={[51.505, -0.09]}
			zoom={10}
			scrollWheelZoom={false}
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
