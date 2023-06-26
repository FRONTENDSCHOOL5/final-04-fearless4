import styled from 'styled-components';
import HeartImg from '../../assets/image/heart-button.png';
import LogoImgCat from '../../assets/image/catNoFeed.png';

export const Logo = styled.img`
	width: 300px;
	position: absolute;
	top: 5%;
	left: 10%;
	object-fit: cover;
	cursor: pointer;
	transition: transform 0.3s ease-in-out;
	&:hover {
		transform: rotate(45deg);
	}
`;

export const Heart = styled.img`
	width: 250px;
	position: absolute;
	top: -65%;
	left: -18%;
	transform: rotate(-30deg);
	cursor: pointer;
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
	display: flex;
	position: relative;
`;

export const Text1 = styled.div`
	position: absolute;
	top: -80px;
	left: 28px;
	z-index: 2;
	transform: rotate(-30deg);
`;

export const Text2 = styled.div`
	position: absolute;
	top: 180px;
	z-index: 2;
	left: 140px;
`;

export function LogoContainer() {
	return (
		<LogoWrapper>
			<Text1>여행 좋다냥</Text1>
			<Text2>click me!</Text2>
			<Heart src={HeartImg} />
			<Logo src={LogoImgCat} />
		</LogoWrapper>
	);
}
