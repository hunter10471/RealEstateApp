import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { PostData } from "../interfaces/PostData";
import { Property, Type } from "@prisma/client";
import jwt from "jsonwebtoken";

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

		return res.status(200).json(posts);
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
		let userId;
		const token = req.cookies.token;
		if (token) {
			jwt.verify(
				token,
				process.env.JWT_SECRET_KEY as string,
				async (err: any, payload: any) => {
					if (err) {
						throw new Error(err);
					} else {
						const savedPost = await prisma.savedPost.findUnique({
							where: {
								userId_postId: {
									postId: id,
									userId: payload.id,
								},
							},
						});
						return res
							.status(200)
							.json({ ...post, isSaved: savedPost ? true : false });
					}
				}
			);
		} else {
			return res.status(200).json({ ...post, isSaved: false });
		}
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
