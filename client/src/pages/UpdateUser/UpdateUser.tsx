import "./updateUser.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Small/Button/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import CloudinaryUploadWidget from "../../components/Medium/UploadWidget/UploadWidget";

const UpdateUser = () => {
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [error, setError] = useState<any>(null);
	const [confirmPassError, setConfirmPassError] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { currentUser, updateUser } = useContext(AuthContext);
	const [avatar, setAvatar] = useState([currentUser?.avatar]);

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		try {
			setLoading(true);
			const res = await apiRequest.put(`user/${currentUser?.id}`, {
				username,
				email,
				password,
				avatar: avatar[0],
			});
			if (res.data) {
				updateUser(res.data);
				navigate("/profile");
			}
		} catch (error: any) {
			setError(error.response.data.message);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (password != confirmPassword) {
			setConfirmPassError(true);
		} else {
			setConfirmPassError(false);
		}
	}, [confirmPassword]);
	return (
		<div className="update">
			<div className="inputContainer">
				<h1>Update Profile</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						defaultValue={currentUser?.username}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						defaultValue={currentUser?.email}
					/>
					<div className="password">
						<input
							type={showPass ? "text" : "password"}
							name="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{showPass ? (
							<IoEye onClick={() => setShowPass(false)} className="eye" />
						) : (
							<IoEyeOff onClick={() => setShowPass(true)} className="eye" />
						)}
					</div>
					<div className="password">
						<input
							type={showConfirmPass ? "text" : "password"}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{showConfirmPass ? (
							<IoEye
								onClick={() => setShowConfirmPass(false)}
								className="eye"
							/>
						) : (
							<IoEyeOff
								onClick={() => setShowConfirmPass(true)}
								className="eye"
							/>
						)}
					</div>
					<Button disabled={loading} fullWidth text="Submit" isSecondary />
				</form>
				{confirmPassError && (
					<span className="error">Passwords do not match.</span>
				)}
				{error && <span className="error">{error}</span>}
			</div>
			<div className="imageContainer">
				<div className="image">
					<img
						src={avatar[0] || currentUser?.avatar || "/assets/avatar.png"}
						alt="user avatar"
					/>
					{/* <label htmlFor="upload_widget">
						<MdOutlineEdit className="edit" />
					</label> */}
					<CloudinaryUploadWidget
						uwConfig={{
							cloudName: "dz79wze9e",
							uploadPreset: "Real_Estate",
							multiple: false,
							folders: "avatars",
						}}
						setState={setAvatar}
					/>
				</div>
			</div>
		</div>
	);
};

export default UpdateUser;
