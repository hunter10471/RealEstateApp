import { useState } from "react";
import "./searchbar.scss";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
	const [query, setQuery] = useState<{
		type: "buy" | "rent";
		location: string;
		minPrice: number;
		maxPrice: number;
	}>({
		type: "buy",
		location: "",
		minPrice: 0,
		maxPrice: 0,
	});

	const switchType = (type: "buy" | "rent") => {
		setQuery((prev) => ({ ...prev, type }));
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
			<form>
				<input type="text" name="location" placeholder="City Location" />
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
