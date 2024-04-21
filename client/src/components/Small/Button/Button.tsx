import './button.scss';

interface ButtonProps {
	text: string;
	isPrimary?: boolean;
}

const Button = ({ text, isPrimary }: ButtonProps) => {
	return (
		<button className={`button ${isPrimary ? 'primary' : ''}`}>{text}</button>
	);
};

export default Button;
