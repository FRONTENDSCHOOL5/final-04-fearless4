import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
	background-color: #81d8d0;
	width: 390px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 0 auto;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 390px;
	padding: 10px 20px 10px 20px;
	background-color: #ffff;
	border-radius: 20px 20px 0 0;
	position: fixed;
	bottom: 0;
	box-sizing: border-box;

	transition: 0.7s;
	transform: translate3d(0, 100%, 0);

	&.modal-open {
		transform: translate3d(0, 0, 0);
	}
`;
