import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 0 auto;
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
`;

export const WavyChar = styled.span`
	@font-face {
		font-family: 'MapoBackpacking';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoBackpackingA.woff')
			format('woff');
		font-weight: normal;
		font-style: normal;
	}
	display: inline-block;
	color: white;
	animation: ${WavyAnimation} 1s infinite;
	animation-delay: calc(0.1s * var(--i));
	font-family: 'MapoBackpacking';
	margin-right: 8px;
`;

export const MascotImg = styled.img`
	width: 350px;
	position: absolute;
	top: 15%;
	z-index: 1;
`;

// const ShakingTail = keyframes`
// 	0% {
// 		transform: rotate(0deg);
// 	}
// 	25% {
// 		transform: rotate(8deg);
// 	}
// 	50% {
// 		transform: rotate(0deg);
// 	}
// 	75% {
// 		transform: rotate(8deg);
// 	}
// 	100% {
// 		transform: rotatate(0deg);
// 	}
// `;

// export const TailImg = styled.img`
// 	width: 40px;
// 	animation: ${ShakingTail} 2s infinite;
// 	animation-timing-function: ease-in-out;
// 	position: absolute;
// 	top: 25%;
// 	left: 55%;
// `;

// export const BaggageAnimation = keyframes`
// 	from {
// 		transform: translate(120px, 80px) rotate(-20deg);
// 	}
// 	to {
// 		transform: translate(-110px, 80px);
// 	}
// `;

// export const BaggageImg = styled.img`
// 	position: absolute;
// 	top: 80px;
// 	left: 500px;
// 	width: 250px;
// 	transform: rotate(-20deg);
// 	z-index: 2;
// 	margin: 0 auto;
// `;
