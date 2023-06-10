import styled from 'styled-components';
import LogoImg from '../../assets/image/travelchar_crop.png';
import HeartImg from '../../assets/image/heart-button.png';

export const Logo = styled.img`
	width: 250px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
`;

export const Heart = styled.img`
	width: 100px;
	position: absolute;
	top: 10%;
	left: 10%;
	transform: rotate(-30deg);
`;

export const LogoText = styled.h1`
	font-family: 'Kanit';
	font-size: 3rem;
	font-weight: 600;
	letter-spacing: 0.15rem;
	color: white;
`;

const Wrapper = styled.div`
	width: 250px;
	min-height: 250px;
	display: flex;
	position: relative;
	background-color: white;
	overflow: hidden;
	border-radius: 50%;
`;

export function LogoContainer() {
	return (
		<Wrapper>
			<Heart src={HeartImg} />
			<Logo src={LogoImg} />
		</Wrapper>
	);
}
