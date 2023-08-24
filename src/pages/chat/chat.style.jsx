import styled from 'styled-components';

export const HomeContainer = styled.main`
	position: relative;
	width: 100%;
	height: calc(100vh - 50px - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	display: flex;
	flex-direction: column;
	background-color: #f2f2f2;
`;

export const Column = styled.article`
	flex: 1;
`;

export const ChatUser = styled.h2`
	flex-grow: 1;
	margin-left: 5px;
`;

export const MessageRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const MessageText = styled.div`
	background-color: white;
	padding: 10px 20px;
	border-radius: 0px 10px 10px 10px;
	max-width: 240px;
`;
export const ChatBox = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 20px;
`;

export const ChatText = styled.p`
	width: fit-content;
	color: black;
	line-height: 1.5;
	font-size: 14px;
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
	height: 149px;
`;

export const MessageText2 = styled.div`
	background-color: #a6e3da;
	padding: 10px 20px;
	border-radius: 10px 10px 0px;
`;

export const ProfileImg = styled.img`
	width: 30px;
	height: 30px;
	object-fit: cover;
	border-radius: 50%;
	margin-bottom: auto;
`;

export const MessageRow2 = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20px;
`;

export const Time = styled.time`
	margin-top: auto;
	font-size: 10px;
`;
export const ChatTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
