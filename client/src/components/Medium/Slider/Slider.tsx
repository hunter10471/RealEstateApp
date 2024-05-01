import { useState } from "react";
import "./slider.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface SliderProps {
	images: string[];
}

const Slider = ({ images }: SliderProps) => {
	const [imageIndex, setImageIndex] = useState<null | number>(null);
	const changeSlide = (direction: "left" | "right") => {
		if (direction === "left") {
			if (imageIndex === 0) {
				setImageIndex(images.length - 1);
			} else {
				if (imageIndex !== null) {
					setImageIndex(imageIndex - 1);
				}
			}
		} else {
			if (imageIndex === images.length - 1) {
				setImageIndex(0);
			} else {
				if (imageIndex !== null) {
					setImageIndex(imageIndex + 1);
				}
			}
		}
	};
	return (
		<div className="slider">
			{imageIndex !== null && (
				<div className="fullSlider">
					<div onClick={() => changeSlide("left")} className="arrow">
						<FaChevronLeft />
					</div>
					<div className="imageContainer">
						<img src={images[imageIndex]} alt="" />
					</div>
					<div onClick={() => changeSlide("right")} className="arrow">
						<FaChevronRight />
					</div>
					<div onClick={() => setImageIndex(null)} className="close">
						<IoMdClose />
					</div>
				</div>
			)}
			<div className="bigImage">
				<img
					onClick={() => setImageIndex(0)}
					src={images[0]}
					alt="big property image"
				/>
			</div>
			<div className="smallImages">
				{images.slice(1).map((image, index) => (
					<img
						onClick={() => setImageIndex(index + 1)}
						src={image}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Slider;
