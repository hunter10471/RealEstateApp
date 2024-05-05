import Map from "../../components/Large/Map/Map";
import Slider from "../../components/Medium/Slider/Slider";
import { singlePostData, userData } from "../../lib/dummyData";
import "./single.scss";
import {
	IoLocationOutline,
	IoRestaurantOutline,
	IoBedOutline,
	IoPawOutline,
} from "react-icons/io5";
import {
	MdChatBubbleOutline,
	MdOutlineBookmarkBorder,
	MdOutlineBathtub,
	MdOutlineSchool,
} from "react-icons/md";
import { FaMoneyBillWave, FaBusSimple, FaRegMoneyBill1 } from "react-icons/fa6";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineThunderbolt } from "react-icons/ai";

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
				<div className="wrapper">
					<p className="title">General</p>
					<div className="listVertical">
						<div className="feature">
							<AiOutlineThunderbolt className="icon" />
							<div className="featureText">
								<span>Utilities</span>
								<p>Renter is responsible</p>
							</div>
						</div>
						<div className="feature">
							<IoPawOutline className="icon" />
							<div className="featureText">
								<span>Pet Policy</span>
								<p>Pets are allowed</p>
							</div>
						</div>
						<div className="feature">
							<FaRegMoneyBill1 className="icon" />
							<div className="featureText">
								<span>Property Fees</span>
								<p>Must have 3 times the rent in household income</p>
							</div>
						</div>
					</div>
					<p className="title">Sizes</p>
					<div className="sizes">
						<div className="size">
							<RxDimensions className="icon" />
							<span>80 sq.ft</span>
						</div>
						<div className="size">
							<IoBedOutline className="icon" />
							<span>2 bed</span>
						</div>
						<div className="size">
							<MdOutlineBathtub className="icon" />
							<span>1 bathroom</span>
						</div>
					</div>
					<p className="title">Nearby Places</p>
					<div className="listHorizontal">
						<div className="feature">
							<MdOutlineSchool className="icon" />
							<div className="featureText">
								<span>School</span>
								<p>250m away</p>
							</div>
						</div>
						<div className="feature">
							<FaBusSimple className="icon" />
							<div className="featureText">
								<span>Bus Stop</span>
								<p>100m away</p>
							</div>
						</div>
						<div className="feature">
							<IoRestaurantOutline className="icon" />
							<div className="featureText">
								<span>Restaurant</span>
								<p>200m away</p>
							</div>
						</div>
					</div>
					<p className="title">Location</p>
					<div className="mapContainer">
						<Map data={[singlePostData as any]} />
					</div>
					<div className="buttons">
						<button>
							<span>Send a message</span>
							<MdChatBubbleOutline className="icon-button" />
						</button>
						<button>
							<span>Save the place</span>
							<MdOutlineBookmarkBorder className="icon-button" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Single;
