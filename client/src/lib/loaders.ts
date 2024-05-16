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
