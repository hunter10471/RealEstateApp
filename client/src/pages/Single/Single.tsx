import Map from "../../components/Large/Map/Map";
import Slider from "../../components/Medium/Slider/Slider";
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
import { FaBusSimple, FaRegMoneyBill1 } from "react-icons/fa6";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { redirect, useLoaderData } from "react-router-dom";
import { Post } from "../../interfaces/post.interface";
import DomPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Single = () => {
	const post = useLoaderData() as Post;
	const { currentUser } = useContext(AuthContext);
	const [saved, setSaved] = useState(post.isSaved);
	const handleSave = async () => {
		if (currentUser) {
			redirect("/login");
		}
		setSaved((prev) => !prev);
		try {
			await apiRequest.post("/user/save", { postId: post.id });
		} catch (error) {
			console.log(error);
			setSaved((prev) => !prev);
		}
	};

	return (
		<div className="singlePage">
			<div className="details">
				<div className="wrapper">
					<Slider images={post.images} />
					<div className="info">
						<div className="top">
							<div className="post">
								<h1>{post.title}</h1>
								<div className="address">
									<IoLocationOutline />
									<span>{post.address}</span>
								</div>
								<div className="price">$ {post.price}</div>
							</div>
							<div className="user">
								<img src={post.user.avatar} alt="user avatar" />
								<span>{post.user.username}</span>
							</div>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: DomPurify.sanitize(post.postDetails.description),
							}}
							className="bottom"
						></div>
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
								<p>{post.postDetails.utilities}</p>
							</div>
						</div>
						<div className="feature">
							<IoPawOutline className="icon" />
							<div className="featureText">
								<span>Pet Policy</span>
								<p>{post.postDetails.pet}</p>
							</div>
						</div>
						<div className="feature">
							<FaRegMoneyBill1 className="icon" />
							<div className="featureText">
								<span>Property Fees</span>
								<p>{post.postDetails.income}</p>
							</div>
						</div>
					</div>
					<p className="title">Sizes</p>
					<div className="sizes">
						<div className="size">
							<RxDimensions className="icon" />
							<span>{post.postDetails.size} sq.ft</span>
						</div>
						<div className="size">
							<IoBedOutline className="icon" />
							<span>{post.bedroom} bed</span>
						</div>
						<div className="size">
							<MdOutlineBathtub className="icon" />
							<span>{post.bathroom} bathroom</span>
						</div>
					</div>
					<p className="title">Nearby Places</p>
					<div className="listHorizontal">
						<div className="feature">
							<MdOutlineSchool className="icon" />
							<div className="featureText">
								<span>School</span>
								<p>
									{post.postDetails.school}
									{post.postDetails.school > 1000 ? +" km" : " m"} away
								</p>
							</div>
						</div>
						<div className="feature">
							<FaBusSimple className="icon" />
							<div className="featureText">
								<span>Bus Stop</span>
								<p>
									{post.postDetails.bus}
									{post.postDetails.bus > 1000 ? +" km" : " m"} away
								</p>
							</div>
						</div>
						<div className="feature">
							<IoRestaurantOutline className="icon" />
							<div className="featureText">
								<span>Restaurant</span>
								<p>
									{post.postDetails.restaurant}
									{post.postDetails.restaurant > 1000 ? +" km" : " m"} away
								</p>
							</div>
						</div>
					</div>
					<p className="title">Location</p>
					<div className="mapContainer">
						<Map data={[post as any]} />
					</div>
					<div className="buttons">
						<button>
							<span>Send a message</span>
							<MdChatBubbleOutline className="icon-button" />
						</button>
						<button
							style={{ backgroundColor: saved ? "#fece51" : "white" }}
							onClick={handleSave}
						>
							<span>{saved ? "Place saved" : "Save the place"}</span>
							<MdOutlineBookmarkBorder className="icon-button" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Single;
