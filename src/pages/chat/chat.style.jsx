import styled from 'styled-components';

export const HomeContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f2f2f2;
`;

export const Column = styled.div`
	flex: 1;
`;

export const MessageRow = styled.div`
	display: flex;
	align-items: center;
`;

export const MessageText = styled.div`
	background-color: white;
	padding: 10px 20px;
	border-radius: 10px 10px 10px 0px;
	max-width: 240px;
`;
export const ChatBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
`;

export const ChatText = styled.p`
	width: fit-content;
	color: black;
	line-height: 1.5;
	font-size: 15px;
`;

export const ChatTextRight = styled.p`
	width: fit-content;
	color: white;
	line-height: 1.5;
	font-size: 15px;
`;

export const ChatImg = styled.img`
	border-radius: 10px 10px 0 10px;
	width: 200px;
`;

export const MessageText2 = styled.div`
	background-color: #a6e3da;
	padding: 10px 20px;
	border-radius: 10px 10px 0px;
`;

export const ProfileImg = styled.img`
	width: 30px;
	height: 30px;
	margin-right: 20px;
	border-radius: 50%;
`;

export const MessageRow2 = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const Time = styled.span`
	margin: 20px;
	font-size: 10px;
`;
