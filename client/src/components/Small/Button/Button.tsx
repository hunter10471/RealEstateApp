import "./button.scss";

interface ButtonProps {
	text: string;
	isPrimary?: boolean;
	isSecondary?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({
	text,
	isPrimary,
	fullWidth,
	disabled,
	onClick,
	isSecondary,
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			className={`button ${isPrimary ? "primary" : ""} ${
				fullWidth ? "fullWidth" : ""
			} ${isSecondary ? "secondary" : ""} `}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
