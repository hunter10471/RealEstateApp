import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface Chat {
	id: string;
	users: User[];
	userIds: string[];
	seenBy: string[];
	messages: Message[];
	reciever: User;
	lastMessage?: string;
	createdAt: Date;
}
