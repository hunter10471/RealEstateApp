import { createContext, useEffect, useState } from "react";
import { User, UserContext } from "../interfaces/user.interface";

export const AuthContext = createContext<UserContext | undefined>(undefined);
export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const localUser = localStorage.getItem("user");
	const [currentUser, setCurrentUser] = useState<User | undefined>(
		localUser ? JSON.parse(localUser) : undefined
	);
	const updateUser = (data: User) => {
		setCurrentUser(data);
	};

	useEffect(() => {
		if (currentUser) {
			localStorage.setItem("user", JSON.stringify(currentUser));
		}
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};
