import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";
import { Socket, io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const initialState: User = {
	id: "",
	username: "",
	email: "",
	password: "",
	avatar: undefined,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const SocketContext = createContext<{ socket: Socket | null }>({
	socket: null,
});

export const SocketContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { currentUser } = useContext(AuthContext);
	useEffect(() => {
		setSocket(io("http://localhost:4000"));
	}, []);

	useEffect(() => {
		currentUser && socket?.emit("newUser", currentUser.id);
	}, [currentUser, socket]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
