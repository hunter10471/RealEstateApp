import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loggedIn = async (req: Request, res: Response) => {
	res.status(200).json({ message: "You are authenticated" });
	console.log(req.userId);
};

export const isAdmin = async (req: Request, res: Response) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized action." });
	}
	jwt.verify(
		token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, payload: any) => {
			if (err) {
				return res.status(403).json({ message: "Token invalid." });
			} else if (!payload.isAdmin) {
				return res.status(403).json({ message: "Unauthorized action." });
			} else {
				return res.status(200).json({ message: "User is admin." });
			}
		}
	);
};
