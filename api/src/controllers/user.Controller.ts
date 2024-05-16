import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while fetching the users.", error });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user = await prisma.user.findUnique({ where: { id } });
		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while fetching the user.", error });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const tokenId = req.userId;
		let newPass = null;
		if (id !== tokenId) {
			return res.status(403).json({ message: "Unauthorized action." });
		}
		const { password, avatar, ...data }: User = req.body;
		if (password) {
			newPass = await bcrypt.hash(password, 10);
		}
		const updatedUser = await prisma.user.update({
			where: { id },
			select: {
				username: true,
				email: true,
				id: true,
				updatedAt: true,
				avatar: true,
				createdAt: true,
			},
			data: {
				...data,
				...(newPass && { password: newPass }),
				...(avatar && { avatar: avatar }),
				updatedAt: new Date(),
			},
		});
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while updating the user.", error });
	}
};
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const tokenId = req.userId;
		if (id !== tokenId) {
			return res.status(403).json({ message: "Unauthorized action." });
		}
		await prisma.user.delete({ where: { id } });
		return res.status(200).json({ message: "User has been deleted." });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while deleting the user.", error });
	}
};
