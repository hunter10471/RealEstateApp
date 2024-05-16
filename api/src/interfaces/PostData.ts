import { Post, PostDetails } from "@prisma/client";

export interface PostData {
	postData: Post;
	postDetails: PostDetails;
}
