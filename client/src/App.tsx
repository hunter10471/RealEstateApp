import Navbar from "./components/Medium/Navbar/navbar";
import "./layout.scss";
import Home from "./pages/Home/Home";

function App() {
	return (
		<div className="layout">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="content">
				<Home />
			</div>
		</div>
	);
}

export default App;
