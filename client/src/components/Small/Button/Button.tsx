import "./button.scss";

interface ButtonProps {
	text: string;
	isPrimary?: boolean;
	fullWidth?: boolean;
}

const Button = ({ text, isPrimary, fullWidth }: ButtonProps) => {
	return (
		<button
			className={`button ${isPrimary ? "primary" : ""} ${
				fullWidth ? "fullWidth" : ""
			}`}
		>
			{text}
		</button>
	);
};

export default Button;
