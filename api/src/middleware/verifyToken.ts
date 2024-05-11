import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;
	if (!token)
		return res.status(401).json({ message: "Action not authenticated." });
	jwt.verify(
		token,
		process.env.JWT_SECRET_KEY as string,
		(err: any, payload: any) => {
			if (err) return res.status(403).json({ message: "Token invalid" });
			req.userId = payload.id;
			next();
		}
	);
};
