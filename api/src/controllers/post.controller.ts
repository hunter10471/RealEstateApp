import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { PostData } from "../interfaces/PostData";
import { Property, Type } from "@prisma/client";

export const getPosts = async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const posts = await prisma.post.findMany({
			where: {
				city: (query.city as string) || undefined,
				type: (query.type as Type) || undefined,
				property: (query.property as Property) || undefined,
				bedroom: query.bedroom ? parseInt(query.bedroom as string) : undefined,
				price: {
					gte: query.minPrice ? parseInt(query.minPrice as string) : 0,
					lte: query.maxPrice ? parseInt(query.maxPrice as string) : 1000000,
				},
			},
		});
		setTimeout(() => {
			return res.status(200).json(posts);
		}, 7000);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error getting posts.", error });
	}
};

export const getPost = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				postDetails: true,
				user: { select: { username: true, email: true, avatar: true } },
			},
		});
		return res.status(200).json(post);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error getting the post.", error });
	}
};

export const addPost = async (req: Request, res: Response) => {
	try {
		const body: PostData = req.body;
		const userId = req.userId;
		console.log(body);
		const newPost = await prisma.post.create({
			data: {
				...body.postData,
				userId,
				postDetails: { create: body.postDetails },
			},
		});
		return res.status(201).json(newPost);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error adding a post.", error });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const userId = req.userId;
		const body = req.body;
		if (id !== userId) {
			return res.status(401).json({ message: "Unauthorized action." });
		} else {
			const updatedPost = await prisma.post.update({
				where: { id },
				data: { ...body, updatedAt: new Date() },
			});
			return res.status(200).json(updatedPost);
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "There was an error updating the post.", error });
	}
};

export const deletePost = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const userId = req.userId;
		const existingPost = await prisma.post.findUnique({ where: { id } });
		if (existingPost?.userId !== userId) {
			return res.status(401).json({ message: "Unauthorized action." });
		} else {
			await prisma.post.delete({ where: { id } });
			return res
				.status(200)
				.json({ message: "Post has been deleted successfully." });
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "There was an error deleting the post.", error });
	}
};
