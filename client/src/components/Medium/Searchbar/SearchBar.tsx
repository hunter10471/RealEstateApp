import { useState } from "react";
import "./searchbar.scss";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState<{
		type: "buy" | "rent";
		city: string;
		minPrice: string;
		maxPrice: string;
	}>({
		type: "buy",
		city: "",
		minPrice: "",
		maxPrice: "",
	});

	const switchType = (type: "buy" | "rent") => {
		setQuery((prev) => ({ ...prev, type }));
	};

	const handleNavigation = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(
			`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
		);
	};

	return (
		<div className="searchbar">
			<div className="type">
				<button
					className={query.type === "buy" ? "active" : ""}
					onClick={() => switchType("buy")}
				>
					Buy
				</button>
				<button
					className={query.type === "rent" ? "active" : ""}
					onClick={() => switchType("rent")}
				>
					Rent
				</button>
			</div>
			<form onSubmit={handleNavigation}>
				<input type="text" name="city" placeholder="City Location" />
				<input
					type="number"
					name="minPrice"
					min={0}
					max={100000}
					placeholder="Minimum Price"
				/>
				<input
					type="number"
					name="maxPrice"
					min={0}
					max={100000}
					placeholder="Max Price"
				/>
				<button className="searchIcon">
					<IoSearch size={20} />
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
