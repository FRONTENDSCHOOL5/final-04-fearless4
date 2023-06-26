import styled from 'styled-components';

export const ToastContainer = styled.div`
	position: absolute;
	top: 45px;
	right: 20px;
	border: 1px solid #dbdbdb;
	padding: 6px;
	border-radius: 3px;
	color: #666;
	background-color: #ffff;
	display: flex;
	align-items: center;
`;

export const ToastMsg = styled.span`
	font-size: 12px;
	color: #333;
	line-height: 18px;
`;

export const ToastMsgBold = styled.span`
	color: #81d8d0;
	font-weight: bold;
`;

export const ToastIcon = styled.span`
	margin-left: -3px;
	margin-bottom: 3px;
`;

export const ToastClose = styled.span`
	cursor: pointer;
	margin-left: 6px;
	font-size: 3px;
	color: #666;
	transition: transform 0.2s ease-in-out;
	&:hover {
		color: black;
		transform: scale(1.2);
	}
`;
