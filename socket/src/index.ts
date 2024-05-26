import { Server } from "socket.io";

const io = new Server({
	cors: {
		origin: "http://localhost:5173",
	},
});

let onlineUsers: { userId: string; socketId: string }[] = [];

const addUser = (userId: string, socketId: string) => {
	const userExists = onlineUsers.find((user) => user.userId === userId);
	if (!userExists) {
		onlineUsers.push({ userId, socketId });
	}
};

const removeUser = (socketId: string) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
	return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	socket.on("newUser", (userId) => {
		addUser(userId, socket.id);
	});
	socket.on("sendMessage", ({ receiverId, data }) => {
		const receiver = getUser(receiverId);
		if (receiver?.socketId) {
			io.to(receiver?.socketId).emit("getMessage", data);
		}
	});
	socket.on("disconnect", () => {
		removeUser(socket.id);
	});
});

io.listen(4000);
