import { createContext, useEffect, useState } from "react";
import { User, UserContext } from "../interfaces/user.interface";

const initialState: User = {
	id: "",
	username: "",
	email: "",
	password: "",
	avatar: undefined,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const AuthContext = createContext<UserContext>({
	currentUser: initialState,
	updateUser: () => {},
});

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const localUser = localStorage.getItem("user");
	const [currentUser, setCurrentUser] = useState<User | null>(
		localUser ? JSON.parse(localUser) : initialState
	);
	const updateUser = (data: User | null) => {
		setCurrentUser(data);
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};
