import { Link } from "react-router-dom";
import Button from "../../components/Small/Button/Button";
import "./login.scss";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	return (
		<div className="login">
			<div className="inputContainer">
				<h1>Login to your account</h1>
				<form>
					<input type="text" name="username" placeholder="Username" />
					<div className="password">
						<input
							type={showPass ? "text" : "password"}
							name="password"
							placeholder="Password"
						/>
						{showPass ? (
							<IoEye onClick={() => setShowPass(false)} className="eye" />
						) : (
							<IoEyeOff onClick={() => setShowPass(true)} className="eye" />
						)}
					</div>
					<Button fullWidth text="Submit" isPrimary />
				</form>
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
