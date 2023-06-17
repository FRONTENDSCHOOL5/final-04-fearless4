import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
	from {
		transform: translateY(200px);
	}
`;

export const DarkBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	width: 100vw;
	height: 100vw;
`;

export const ModalWrap = styled.div`
	width: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	border-radius: 10px 10px 0 0;
	border: solid 1px black;
	box-sizing: border-box;
	padding: 36px 20px 24px;
	position: fixed;
	bottom: 0;
	left: 0;

	animation-duration: 0.5s;
	animation-timing-function: ease-out;
	animation-name: ${slideUp};
	animation-fill-mode: forwards;

	&::after {
		content: '';
		background-color: #dbdbdb;
		border-radius: 5px;
		width: 50px;
		height: 4px;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
	}
`;

export const ModalText = styled.span`
	font-size: 14px;
	font-weight: 500;
	padding: 10px 5px;
	cursor: pointer;

	&:hover {
		color: white;
		background-color: #81d8d0;
	}
`;
