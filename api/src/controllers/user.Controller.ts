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

export const savePost = async (req: Request, res: Response) => {
	try {
		const postId = req.body.postId;
		const tokenUserId = req.userId;
		const savedPost = await prisma.savedPost.findUnique({
			where: {
				userId_postId: {
					userId: tokenUserId,
					postId,
				},
			},
		});
		if (savedPost) {
			await prisma.savedPost.delete({
				where: {
					id: savedPost.id,
				},
			});
			return res.status(200).json({ message: "Post removed from saved list." });
		} else {
			await prisma.savedPost.create({ data: { postId, userId: tokenUserId } });
			return res.status(200).json({ message: "Post saved." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while saving the post.", error });
	}
};

export const profilePosts = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const userPosts = await prisma.post.findMany({
			where: {
				userId,
			},
		});
		const saved = await prisma.savedPost.findMany({
			where: {
				userId,
			},
			include: { post: true },
		});
		const savedPosts = saved.map((savedPost) => savedPost.post);
		return res.status(200).json({ userPosts, savedPosts });
	} catch (error) {
		return res.status(500).json({
			message: "An error occurred while fetching profile posts.",
			error,
		});
	}
};

export const getNotification = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const chatsNumber = await prisma.chat.count({
			where: {
				userIds: { hasSome: [userId] },
				NOT: {
					seenBy: {
						hasSome: [userId],
					},
				},
			},
		});
		return res.status(200).json(chatsNumber);
	} catch (error) {
		return res.status(500).json({
			message: "An error occurred while fetching notifications.",
			error,
		});
	}
};
