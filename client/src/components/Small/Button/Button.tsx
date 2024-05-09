import "./button.scss";

interface ButtonProps {
	text: string;
	isPrimary?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
}

const Button = ({ text, isPrimary, fullWidth, disabled }: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			className={`button ${isPrimary ? "primary" : ""} ${
				fullWidth ? "fullWidth" : ""
			}`}
		>
			{text}
		</button>
	);
};

export default Button;
