import styled from 'styled-components';
import LogoImg from '../../assets/image/travelchar_crop.png';
import HeartImg from '../../assets/image/heart-button.png';
import { Heart, Logo } from './logo.style.jsx';

const Wrapper = styled.div`
	width: 250px;
	min-height: 250px;
	display: flex;
	position: relative;
	background-color: white;
	overflow: hidden;
	border-radius: 50%;
`;

export default function LogoContainer() {
	return (
		<Wrapper>
			<Heart src={HeartImg} />
			<Logo src={LogoImg} />
		</Wrapper>
	);
}
