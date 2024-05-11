export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserContext {
	currentUser?: User;
	updateUser?: (data: User) => void;
}
