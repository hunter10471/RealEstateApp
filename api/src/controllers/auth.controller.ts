import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		return res
			.status(201)
			.json({ message: "User created successfully.", user: newUser });
	} catch (error: any) {
		if (error.code === "P2002") {
			if (error.meta.target.includes("email")) {
				return res.status(400).json({
					message: "User already exists with the following email.",
					error,
				});
			} else if (error.meta.target.includes("username")) {
				return res.status(400).json({
					message: "User already exists with the following username.",
					error,
				});
			}
		} else {
			return res.status(500).json({
				message: "There was an error creating the user.",
				error,
			});
		}
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const existingUser = await prisma.user.findUnique({ where: { username } });
		if (!existingUser) {
			return res.status(404).json({
				message: "Incorrect credentials.",
			});
		} else {
			const comparePassword = await bcrypt.compare(
				password,
				existingUser.password
			);
			if (comparePassword) {
				const tokenAge = 1000 * 60 * 60 * 24 * 7;
				const token = jwt.sign(
					{
						id: existingUser.id,
					},
					process.env.JWT_SECRET_KEY as string,
					{
						expiresIn: tokenAge,
					}
				);
				return res
					.cookie("token", token, { httpOnly: true, maxAge: tokenAge })
					.status(200)
					.json({ message: "Login successful." });
			} else {
				return res.status(401).json({
					message: "Incorrect credentials.",
				});
			}
		}
	} catch (error) {
		return res.status(500).json({
			message: "There was an error logging in the user.",
			error,
		});
	}
};

export const logout = (req: Request, res: Response) => {
	try {
		return res
			.clearCookie("token")
			.status(200)
			.json({ message: "Logged out successfully." });
	} catch (error) {
		return res.status(500).json({
			message: "There was an error logging out the user.",
			error,
		});
	}
};
