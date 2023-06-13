import styled from 'styled-components';

export const ModalWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 30px;
	border-radius: 10px 10px 0 0;
	background-color: #bdbdbd;
	box-sizing: border-box;
	padding: 36px 26px 24px;
	position: fixed;
	bottom: 0;
	left: 0;

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
	font-weight: 400;
	cursor: pointer;
`;
