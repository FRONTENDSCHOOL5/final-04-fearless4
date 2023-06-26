import styled from 'styled-components';
import LogoImg from '../../assets/image/travelchar_crop.png';
import HeartImg from '../../assets/image/heart-button.png';

export const Logo = styled.img`
	width: 300px;
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
`;

export const Heart = styled.img`
	width: 250px;
	position: absolute;
	top: -65%;
	left: -18%;
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
	display: flex;
	position: relative;
`;

export function LogoContainer() {
	return (
		<LogoWrapper>
			<Heart src={HeartImg} />
			<Logo src={LogoImg} />
		</LogoWrapper>
	);
}
