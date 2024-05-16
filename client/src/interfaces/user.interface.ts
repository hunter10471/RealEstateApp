import { Post } from "./post.interface";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	posts?: Post[];
	createdAt: Date;
	updatedAt: Date;
}

export interface UserContext {
	currentUser: User | null;
	updateUser: (data: User | null) => void;
}
