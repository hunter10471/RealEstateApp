import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/Large/Card/Card";
import Map from "../../components/Large/Map/Map";
import Filter from "../../components/Medium/Filter/Filter";
import "./list.scss";
import { Post } from "../../interfaces/post.interface";
import { Suspense } from "react";
import CardSkeleton from "../../components/Large/Card/CardSkeleton";
import MapSkeleton from "../../components/Large/Map/MapSkeleton";

const List = () => {
	const data = useLoaderData() as { postResponse: { data: Post[] } };
	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					<Suspense
						fallback={
							<>
								<CardSkeleton />
								<CardSkeleton />
							</>
						}
					>
						<Await
							resolve={data.postResponse}
							errorElement={<p>Error loading posts</p>}
						>
							{(postResponse) =>
								postResponse.data.map((post: Post) => (
									<Card {...post} key={post.id} />
								))
							}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="mapContainer">
				<Suspense fallback={<MapSkeleton />}>
					<Await
						resolve={data.postResponse}
						errorElement={<p>Error loading posts</p>}
					>
						{(postResponse) => <Map data={postResponse.data} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
};

export default List;
