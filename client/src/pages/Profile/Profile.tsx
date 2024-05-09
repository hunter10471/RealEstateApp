import { useNavigate } from "react-router-dom";
import List from "../../components/Large/List/List";
import Chat from "../../components/Medium/Chat/Chat";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";
import { useState } from "react";

const Profile = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const handleLogout = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await apiRequest.post("/auth/logout");
			if (res.data) {
				localStorage.removeItem("user");
				navigate("/");
			}
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
						<button>Update Profile</button>
					</div>
					<div className="info">
						<span>
							Avatar:{" "}
							<img
								src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
							/>
						</span>
						<span>
							Username: <b>John Doe</b>
						</span>
						<span>
							Email: <b>john@mail.com</b>
						</span>
						<button disabled={loading} onClick={handleLogout}>
							Logout
						</button>
						{error && <span className="error">{error}</span>}
					</div>
					<div className="title">
						<h1>My List</h1>
						<button>Create Post</button>
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
