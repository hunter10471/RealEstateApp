import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const addMessage = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const chatId = req.params.id;
		const text = req.body.text;
		const chat = await prisma.chat.findUnique({
			where: { id: chatId, userIds: { hasSome: [userId] } },
		});
		if (!chat) {
			return res.status(404).json({ message: "Chat not found." });
		} else {
			const message = await prisma.message.create({
				data: {
					text,
					chatId,
					userId,
				},
			});
			await prisma.chat.update({
				where: { id: chatId },
				data: { seenBy: [userId], lastMessage: text },
			});
			return res.status(200).json(message);
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error while sending a message." });
	}
};
