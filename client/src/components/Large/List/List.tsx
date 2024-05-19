import { Post } from "../../../interfaces/post.interface";
import Card from "../Card/Card";
import "./list.scss";

interface ListProps {
	listData: Post[];
}

const List = ({ listData }: ListProps) => {
	console.log(listData);
	return (
		<div className="list">
			{listData.map((item) => (
				<Card key={item.id} {...item} />
			))}
		</div>
	);
};

export default List;
