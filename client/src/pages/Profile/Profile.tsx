import { Await, useLoaderData, useNavigate } from "react-router-dom";
import List from "../../components/Large/List/List";
import Chat from "../../components/Medium/Chat/Chat";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardSkeleton from "../../components/Large/Card/CardSkeleton";
import { Post } from "../../interfaces/post.interface";

const Profile = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const { currentUser, updateUser } = useContext(AuthContext);
	const data = useLoaderData() as {
		postResponse: { data: { userPosts: Post[]; savedPosts: Post[] } };
	};
	console.log(data);
	const handleLogout = async () => {
		try {
			setLoading(true);
			setError(null);
			await apiRequest.post("/auth/logout");
			updateUser(null);
			navigate("/");
		} catch (error: any) {
			setError(error.response.data.message);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="profile">
			<div className="details">
				<div className="wrapper">
					<div className="title">
						<h1>User Information</h1>
						<button onClick={() => navigate("/profile/update")}>
							Update Profile
						</button>
					</div>
					<div className="info">
						<span>
							Avatar:{" "}
							<img
								src={currentUser?.avatar || "./assets/avatar.png"}
								alt="avatar"
							/>
						</span>
						<span>
							Username: <b>{currentUser?.username}</b>
						</span>
						<span>
							Email: <b>{currentUser?.email}</b>
						</span>
						<button disabled={loading} onClick={handleLogout}>
							Logout
						</button>
						{error && <span className="error">{error}</span>}
					</div>
					<div className="title">
						<h1>My List</h1>
						<button onClick={() => navigate("/post/add")}>Create Post</button>
					</div>

					<Suspense
						fallback={
							<>
								<CardSkeleton />
								<CardSkeleton />
							</>
						}
					>
						<Await
							resolve={data.postResponse}
							errorElement={<p>Error loading posts</p>}
						>
							{(postResponse) => (
								<List listData={postResponse.data.userPosts} />
							)}
						</Await>
					</Suspense>
					<div className="title">
						<h1>Saved List</h1>
					</div>
					<Suspense
						fallback={
							<>
								<CardSkeleton />
								<CardSkeleton />
							</>
						}
					>
						<Await
							resolve={data.postResponse}
							errorElement={<p>Error loading posts</p>}
						>
							{(postResponse) => (
								<List listData={postResponse.data.savedPosts} />
							)}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="chatContainer">
				<div className="wrapper">
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default Profile;
