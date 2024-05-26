import { Chat, User } from "@prisma/client";

export interface ChatType extends Chat {
	receiver?: User;
	users: User[];
}
