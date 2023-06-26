import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
	background-color: #81d8d0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding-top: 8%;
	box-sizing: border-box;
`;

export const SplashWrap = styled.div`
	width: 100%;
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const WavyAnimation = keyframes`
	0%,
	40%,
	100% {
		transform: translateY(0);
	}
	20% {
		transform: translateY(-20px);
	}
`;

export const WavyCharWrap = styled.div`
	-webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
	font-size: 60px;
	display: flex;
	gap: 18px;
	z-index: 101;
`;

export const WavyChar = styled.span`
	font-family: 'MapoBackpacking';
	display: inline-block;
	color: white;
	animation: ${WavyAnimation} 1s infinite;
	animation-delay: calc(0.1s * var(--i));
`;

export const CatWrap = styled.div`
	position: relative;
	width: 350px;
	margin-bottom: -50px;
`;

export const MascotImg = styled.img`
	width: 100%;
	z-index: 99;
	position: relative;
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

export const TailImg = styled.img`
	width: 40px;
	animation: ${ShakingTail} 2s infinite;
	animation-timing-function: ease-in-out;
	position: absolute;
	top: 38%;
	left: 59%;
	z-index: 98;
`;

export const BaggageAnimation = keyframes`
	from {
		transform: translate(45%, -50%) rotate(-20deg);
	}
	to {
		transform: translate(-50%, -50%);
	}
`;

export const BaggageImg = styled.img`
	position: absolute;
	top: 80%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 250px;
	z-index: 100;
	animation: ${BaggageAnimation} 2.8s infinite;
	animation-timing-function: ease-in-out;
`;
