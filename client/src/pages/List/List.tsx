import { useLoaderData } from "react-router-dom";
import Card from "../../components/Large/Card/Card";
import Map from "../../components/Large/Map/Map";
import Filter from "../../components/Medium/Filter/Filter";
import "./list.scss";
import { Post } from "../../interfaces/post.interface";

const List = () => {
	const list = useLoaderData() as Post[];
	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					{list.map((post) => (
						<Card {...post} key={post.id} />
					))}
				</div>
			</div>
			<div className="mapContainer">
				<Map data={list} />
			</div>
		</div>
	);
};

export default List;
