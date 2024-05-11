import { useContext } from "react";
import SearchBar from "../../components/Medium/Searchbar/SearchBar";
import "./home.scss";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
	const user = useContext(AuthContext)?.currentUser;
	console.log(user);
	return (
		<div className="homePage">
			<div className="textContainer">
				<div className="wrapper">
					<h1 className="title">Discover Your Dream Home Today</h1>
					<p>
						Explore a World of Possibilities with Our Trusted Real Estate
						Experts, Tailoring Properties to Your Lifestyle. Start Your Journey
						Towards Homeownership Now!
					</p>
					<SearchBar />
					<div className="boxes">
						<div className="box">
							<h1>15+</h1>
							<h2>Years of experience</h2>
						</div>
						<div className="box">
							<h1>100+</h1>
							<h2>Agents enrolled</h2>
						</div>
						<div className="box">
							<h1>1200+</h1>
							<h2>Properties ready</h2>
						</div>
					</div>
				</div>
			</div>
			<div className="imageContainer">
				<img src="./assets/bg.png" alt="background-image" />
			</div>
		</div>
	);
};

export default Home;
