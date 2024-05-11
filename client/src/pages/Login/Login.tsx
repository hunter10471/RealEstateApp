import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Small/Button/Button";
import "./login.scss";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const user = useContext(AuthContext)?.currentUser;
	const updateUser = useContext(AuthContext)?.updateUser;

	const navigate = useNavigate();

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get("username");
		const password = formData.get("password");
		try {
			setError(null);
			setLoading(true);
			const res = await apiRequest.post("auth/login", {
				username,
				password,
			});

			if (res.data && updateUser) {
				updateUser(res.data);
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
		<div className="login">
			<div className="inputContainer">
				<h1>Login to your account</h1>
				<form onSubmit={handleSubmit}>
					<input
						required
						minLength={3}
						maxLength={20}
						type="text"
						name="username"
						placeholder="Username"
					/>
					<div className="password">
						<input
							type={showPass ? "text" : "password"}
							name="password"
							placeholder="Password"
							required
						/>
						{showPass ? (
							<IoEye onClick={() => setShowPass(false)} className="eye" />
						) : (
							<IoEyeOff onClick={() => setShowPass(true)} className="eye" />
						)}
					</div>
					<Button disabled={loading} fullWidth text="Submit" isPrimary />
				</form>
				{error && <span className="error">{error}</span>}
				<Link className="redirect" to={"/register"}>
					Don't have an account? Create one.
				</Link>
			</div>
			<div className="imageContainer">
				<img src="./assets/bg.png" alt="background-image" />
			</div>
		</div>
	);
};

export default Login;
