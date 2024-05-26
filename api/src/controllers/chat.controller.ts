import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ChatType } from "../interfaces/Chat";

export const getChats = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const chats = await prisma.chat.findMany({
			where: {
				userIds: {
					hasSome: [userId],
				},
			},
			include: {
				users: true,
			},
		});
		chats.forEach((chat: ChatType) => {
			chat.users = chat.users.filter((user) => user.id !== userId);
			chat.receiver = chat.users[0];
		});
		return res.status(200).json(chats);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error while fetching all chats." });
	}
};

export const getChat = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const chatId = req.params.id;
		const chat = await prisma.chat.findUnique({
			where: { id: chatId, userIds: { hasSome: [userId] } },
			include: {
				messages: { orderBy: { createdAt: "asc" } },
			},
		});
		await prisma.chat.update({
			where: { id: chatId },
			data: {
				seenBy: {
					push: [userId],
				},
			},
		});
		return res.status(200).json(chat);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error while fetching chat." });
	}
};

export const addChat = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const { receieverId } = req.body;
		const newChat = await prisma.chat.create({
			data: {
				userIds: [userId, receieverId],
			},
		});
		return res.status(200).json(newChat);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error while adding the chat." });
	}
};

export const readChat = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const chatId = req.params.id;
		const updatedChat = await prisma.chat.update({
			where: {
				id: chatId,
				userIds: { hasSome: [userId] },
			},
			data: { seenBy: { push: [userId] } },
		});
		return res.status(200).json(updatedChat);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error while reading the chat." });
	}
};
