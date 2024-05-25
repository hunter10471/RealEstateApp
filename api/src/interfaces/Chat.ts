import { Chat, User } from "@prisma/client";

export interface ChatType extends Chat {
	reciever?: User;
	users: User[];
}
