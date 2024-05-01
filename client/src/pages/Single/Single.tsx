import Slider from "../../components/Medium/Slider/Slider";
import { singlePostData, userData } from "../../lib/dummyData";
import "./single.scss";
import { IoLocationOutline } from "react-icons/io5";

const Single = () => {
	return (
		<div className="singlePage">
			<div className="details">
				<div className="wrapper">
					<Slider images={singlePostData.images} />
					<div className="info">
						<div className="top">
							<div className="post">
								<h1>{singlePostData.title}</h1>
								<div className="address">
									<IoLocationOutline />
									<span>{singlePostData.address}</span>
								</div>
								<div className="price">$ {singlePostData.price}</div>
							</div>
							<div className="user">
								<img src={userData.img} alt="user avatar" />
								<span>{userData.name}</span>
							</div>
						</div>
						<div className="bottom">{singlePostData.description}</div>
					</div>
				</div>
			</div>
			<div className="features">
				<div className="wrapper"></div>
			</div>
		</div>
	);
};

export default Single;
