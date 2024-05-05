import { ListData } from "../../../interfaces/data";
import { listData } from "../../../lib/dummyData";
import Card from "../Card/Card";
import "./list.scss";

interface ListProps {
	listData?: ListData[];
}

const List = ({}: ListProps) => {
	return (
		<div className="list">
			{listData.map((item) => (
				<Card key={item.id} {...item} />
			))}
		</div>
	);
};

export default List;
