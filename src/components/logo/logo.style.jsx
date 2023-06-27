import styled, { keyframes } from 'styled-components';
import HeartImg from '../../assets/image/heart-button.png';
import LogoImgCat from '../../assets/image/catNoFeed.png';

export const Logo = styled.img`
	width: 300px;
	position: absolute;
	top: 50%;
	left: 55%;
	transform: translate(-50%, -50%);
	object-fit: cover;
	cursor: pointer;
	transition: transform 0.3s ease-in-out;
	&:hover {
		transform: translate(-50%, -50%) rotate(45deg);
	}
`;

export const LoginCat = styled.img`
	width: 380px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
	z-index: 2;
`;

export const Heart2 = styled.img`
	width: 250px;
	position: absolute;
	top: -40%;
	left: -25%;
	transform: rotate(-30deg);
`;

export const Heart = styled.img`
	width: 250px;
	position: absolute;
	top: -40%;
	left: -15%;
	transform: rotate(-30deg);
`;

export const LogoText = styled.h1`
	font-family: 'Kanit';
	font-size: 3rem;
	font-weight: 600;
	letter-spacing: 0.15rem;
	color: white;
`;

export const LogoWrapper = styled.div`
	width: 350px;
	min-height: 250px;
	margin-top: -100px;
	margin-bottom: 50px;
	display: flex;
	text-align: center;
	justify-content: center;
	position: relative;
`;

export const Text2 = styled.div`
	position: absolute;
	top: 90%;
	z-index: 2;
`;

const ShakingTail = keyframes`
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(8deg);
	}
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(8deg);
	}
	100% {
		transform: rotate(0deg);
	}
`;

export const CatTailImg = styled.img`
	position: absolute;
	top: 42%;
	left: 59%;
	width: 48px;
	z-index: 1;
	animation: ${ShakingTail} 2s infinite;
	animation-timing-function: ease-in-out;
`;

export function LogoContainer() {
	return (
		<LogoWrapper>
			<Text2>click me!</Text2>
			<Heart2 src={HeartImg} />
			<Logo src={LogoImgCat} />
		</LogoWrapper>
	);
}
