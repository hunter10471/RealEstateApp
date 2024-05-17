import { IoSearch } from "react-icons/io5";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Filter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState<{
		type: string;
		property: string;
		minPrice: string;
		maxPrice: string;
		bedroom: string;
		city: string;
	}>({
		type: searchParams.get("type") || "",
		property: searchParams.get("property") || "",
		minPrice: searchParams.get("minPrice") || "",
		maxPrice: searchParams.get("maxPrice") || "",
		bedroom: searchParams.get("bedroom") || "",
		city: searchParams.get("city") || "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault();
		setQuery({ ...query, [e.target.name]: e.target.value });
	};

	const handleFilter = () => {
		setSearchParams(query);
	};

	return (
		<div className="filter">
			<h1>
				Search results for <b>{query.city}</b>
			</h1>
			<div className="top">
				<div className="item">
					<label htmlFor="city">Location</label>
					<input
						onChange={handleChange}
						defaultValue={searchParams.get("city") || ""}
						type="text"
						name="city"
						id="city"
						placeholder="Location"
					/>
				</div>
			</div>
			<div className="bottom">
				<div className="item">
					<label htmlFor="type">Type</label>
					<select
						defaultValue={query.type}
						onChange={handleChange}
						name="type"
						id="type"
					>
						<option value="">any</option>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="property">Property</label>
					<select
						defaultValue={query.property}
						onChange={handleChange}
						name="property"
						id="property"
					>
						<option value="">any</option>
						<option value="apartment">Apartment</option>
						<option value="house">House</option>
						<option value="condo">Condo</option>
						<option value="land">Land</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="minPrice">Minimum Price</label>
					<input
						defaultValue={query.minPrice}
						onChange={handleChange}
						type="number"
						name="minPrice"
						id="minPrice"
						placeholder="any"
					/>
				</div>
				<div className="item">
					<label htmlFor="maxPrice">Maximum Price</label>
					<input
						defaultValue={query.maxPrice}
						onChange={handleChange}
						type="number"
						name="maxPrice"
						id="maxPrice"
						placeholder="any"
					/>
				</div>
				<div className="item">
					<label htmlFor="bedroom">Bedroom</label>
					<input
						defaultValue={query.bedroom}
						onChange={handleChange}
						type="number"
						name="bedroom"
						id="bedroom"
						placeholder="any"
					/>
				</div>
				<button onClick={handleFilter} className="searchIcon">
					<IoSearch size={20} />
				</button>
			</div>
		</div>
	);
};

export default Filter;
