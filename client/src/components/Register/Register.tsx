import { Link } from "react-router-dom";
import Button from "../Small/Button/Button";
import "./register.scss";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	return (
		<div className="register">
			<div className="inputContainer">
				<h1>Create an account</h1>
				<form>
					<input type="text" name="username" placeholder="Username" />
					<input type="email" name="email" placeholder="Email" />
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
