import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({
	request,
	params,
}: {
	request: any;
	params: any;
}) => {
	const res = await apiRequest("/post/" + params.id);
	return res.data;
};

export const listPageLoader = async ({
	request,
	params,
}: {
	request: any;
	params: any;
}) => {
	const query = request.url.split("?")[1];
	const postPromise = apiRequest("/post?" + query);
	return defer({
		postResponse: postPromise,
	});
};
