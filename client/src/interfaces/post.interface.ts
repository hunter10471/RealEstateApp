import { User } from "./user.interface";
import { Property, Type } from "../utils/enum";

export interface Post {
	id: string;
	title: string;
	price: number;
	images: string[];
	address: String;
	city: String;
	bedroom: number;
	bathroom: number;
	latitude: string;
	longitude: string;
	type: Type;
	property: Property;
	user: User;
	userId: string;
	postDetails: PostDetails;
	createdAt: Date;
	updatedAt: Date;
}

export interface PostDetails {
	id: string;
	description: string;
	utilities: string;
	pet: string;
	income: string;
	size: number;
	school: number;
	restaurant: number;
	postId: string;
	post: Post;
}
