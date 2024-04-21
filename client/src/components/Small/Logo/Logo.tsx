import './logo.scss';
import { MdOutlineHomeWork } from 'react-icons/md';

const Logo = () => {
	return (
		<a className='logo' href='/'>
			<MdOutlineHomeWork size='40' />
			<span>HomeHarbor</span>
		</a>
	);
};

export default Logo;
