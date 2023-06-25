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
	width: 100%;
	height: 100%;
	z-index: 999;
`;

export const ModalWrap = styled.div`
	width: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	border-radius: 10px 10px 0 0;
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

export const ModalText = styled.button`
	font-family: 'Suit-Regular';
	border: 0;
	background-color: transparent;
	display: flex;
	font-size: 14px;
	font-weight: 500;
	padding: 10px 5px;
	cursor: pointer;

	&:hover {
		border-radius: 10px;
		color: white;
		background-color: #81d8d0;
	}
`;

export const CheckModalWrap = styled.div`
	width: 250px;
	height: 110px;
	background-color: #fff;
	border-radius: 10px;
	box-sizing: border-box;
	padding-top: 22px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const CheckMsg = styled.span`
	font-size: 16px;
	font-weight: 500;
`;

export const CheckButtonWrap = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	border-top: solid 1px #dbdbdb;
	border-radius: 0 0 10px 10px;
	box-sizing: border-box;
	position: absolute;
	bottom: 0;
	left: 0;
	overflow: hidden;
`;

export const CheckLogout = styled.button`
	font-family: 'Suit-Regular';
	display: flex;
	width: 50%;
	align-items: center;
	justify-content: center;
	padding: 14px 0;
	border: 0;
	background-color: transparent;
	font-size: 14px;
	font-weight: 400;
	color: ${({ check }) => (check === true ? `#81D8D0` : `initial`)};
	border-left: ${({ check }) =>
		check === true ? `solid 1px #DBDBDB` : `initial`};
	box-sizing: border-box;
	cursor: pointer;

	&:hover {
		color: ${({ check }) => (check === true ? `#fff` : `#fff`)};
		background-color: #81d8d0;
	}
`;

export const CheckConfirm = styled.button`
	font-family: 'Suit-Regular';
	display: flex;
	width: 50%;
	align-items: center;
	justify-content: center;
	padding: 14px 0;
	border: 0;
	background-color: transparent;
	font-size: 14px;
	font-weight: 400;
	color: ${({ check }) => (check === true ? `#81D8D0` : `initial`)};
	border-left: ${({ check }) =>
		check === true ? `solid 1px #DBDBDB` : `initial`};
	box-sizing: border-box;
	cursor: pointer;

	&:hover {
		color: ${({ check }) => (check === true ? `#fff` : `#fff`)};
		background-color: #81d8d0;
	}
`;
