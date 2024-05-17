import "./card.scss";

const CardSkeleton = () => {
	return (
		<div className="card-skeleton">
			<div className="image-skeleton"></div>
			<div className="textContainer-skeleton">
				<div className="title-skeleton"></div>
				<div className="address-skeleton"></div>
				<div className="price-skeleton"></div>
				<div className="bottom-skeleton">
					<div className="features-skeleton">
						<div className="feature-skeleton"></div>
						<div className="feature-skeleton"></div>
					</div>
					<div className="icons-skeleton">
						<div className="icon-skeleton"></div>
						<div className="icon-skeleton"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSkeleton;
