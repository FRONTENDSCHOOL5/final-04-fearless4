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
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	height: calc(100vh - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	overflow: hidden;
`;

export const CatWrap = styled.div`
	position: relative;
	width: 450px;
`;

export const NotFoundSign = styled.img`
	width: 565px;
	height: 441px;
	margin-top: -60px;
`;

export const NotFoundText = styled.p`
	font-family: 'omyu_pretty';
	color: #da3666;
	font-weight: bold;
	text-align: center;
	font-size: 40px;
	margin-top: -260px;
	line-height: 50px;
`;

export const Cat404Img = styled.img`
	width: 450px;
	height: 300px;
	margin: 120px 0 0 10px;
`;

export const HomeButton = styled.button`
	font-family: 'Suit-Regular';
	border: none;
	border-radius: 44px;
	height: 44px;
	margin-top: -45px;
	padding: 15px;
	font-size: 14px;
	line-height: 14px;
	cursor: pointer;
	color: #fff;
	background-color: #81d8d0;
	z-index: 999;
`;

export const AnimationWrap = styled.div`
	position: relative;
	scale: 0.6;
	top: -10px;
	left: 90px;
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
	position: absolute;
	width: 140px;
	top: 245px;
	left: 160px;
	transform: rotate(20deg);
`;
