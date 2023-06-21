import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
	from {
		transform: translateY(300px);
	}
`;

export const Wrapper = styled.div`
	min-width: 420px;
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
	width: 100%;
	padding: 30px 34px 20px 34px;
	background-color: #ffff;
	border-radius: 20px 20px 0 0;
	position: fixed;
	bottom: 0;
	box-sizing: border-box;

	animation-duration: 0.8s;
	animation-timing-function: ease-out;
	animation-name: ${slideUp};
	animation-fill-mode: forwards;
`;
