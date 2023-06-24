import styled, { keyframes } from 'styled-components';

export const SnoringAnimation = keyframes`
0% {
  transform: translateY(0) scale(1);
}
50% {
  transform: translateY(-100px) scale(1.2);
}
100% {
  transform: translateY(0) scale(1);
}
`;

export const Page404Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #81d8d0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

export const NotFoundSign = styled.img`
	margin-top: -60px;
`;

export const NotFoundText = styled.p`
	@font-face {
		font-family: 'MapoBackpacking';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoBackpackingA.woff')
			format('woff');
		font-weight: normal;
		font-style: normal;
	}
	font-family: 'MapoBackpacking';
	color: red;
	font-weight: bold;
	text-align: center;
	font-size: 40px;
	margin-top: -260px;
	line-height: 50px;
`;

export const Cat404Img = styled.img`
	margin-top: 80px;
`;

export const HomeButton = styled.button`
	border: none;
	border-radius: 44px;
	height: 44px;
	padding: 15px;
	font-size: 14px;
	line-height: 14px;
	cursor: pointer;
	background-color: #ffff;
`;

export const AnimationWrap = styled.div`
	position: relative;
`;

export const SnoreLargeImg = styled.img`
	position: absolute;
	width: 80px;
	top: -380px;
	left: 220px;
	animation: ${SnoringAnimation} 2s infinite;
`;

export const SnoreMediumImg = styled.img`
	position: absolute;
	width: 50px;
	top: -400px;
	left: 280px;
	animation: ${SnoringAnimation} 2s infinite;
	animation-delay: 0.1s;
`;

export const SnoreSmallImg = styled.img`
	position: absolute;
	width: 40px;
	top: -430px;
	left: 320px;
	animation: ${SnoringAnimation} 2s infinite;
	animation-delay: 0.2s;
`;

export const LuggageImg = styled.img`
	position: relative;
	width: 240px;
	top: -390px;
	left: -170px;
`;
