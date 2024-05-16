import { useNavigate } from "react-router-dom";
import List from "../../components/Large/List/List";
import Chat from "../../components/Medium/Chat/Chat";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const { currentUser, updateUser } = useContext(AuthContext);

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
					<List />
					<div className="title">
						<h1>Saved List</h1>
					</div>
					<List />
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
