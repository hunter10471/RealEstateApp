import Card from "../../components/Large/Card/Card";
import Map from "../../components/Large/Map/Map";
import Filter from "../../components/Medium/Filter/Filter";
import { listData } from "../../lib/dummyData";
import "./list.scss";

const List = () => {
	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					{listData.map((item) => (
						<Card {...item} key={item.id} />
					))}
				</div>
			</div>
			<div className="mapContainer">
				<Map data={listData} />
			</div>
		</div>
	);
};

export default List;
