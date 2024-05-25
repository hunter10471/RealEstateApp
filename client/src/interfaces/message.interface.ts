import { Chat } from "./chat.interface";

export interface Message {
	id: string;
	text: string;
	userId: string;
	chat: Chat;
	chatId: string;
	createdAt: Date;
}
