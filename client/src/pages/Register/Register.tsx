import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Small/Button/Button";
import "./register.scss";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [error, setError] = useState<any>(null);
	const [confirmPassError, setConfirmPassError] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		try {
			setLoading(true);
			const res = await axios.post("http://localhost:8080/api/auth/register", {
				username,
				email,
				password,
			});
			if (res.data) {
				navigate("/login");
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
		<div className="register">
			<div className="inputContainer">
				<h1>Create an account</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" name="username" placeholder="Username" />
					<input type="email" name="email" placeholder="Email" />
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
					<Button disabled={loading} fullWidth text="Submit" isPrimary />
				</form>
				{confirmPassError && (
					<span className="error">Passwords do not match.</span>
				)}
				{error && <span className="error">{error}</span>}
				<Link className="redirect" to={"/login"}>
					Already have an account? Login.
				</Link>
			</div>
			<div className="imageContainer">
				<img src="./assets/bg.png" alt="background-image" />
			</div>
		</div>
	);
};

export default Register;
