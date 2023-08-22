import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.ul`
	height: calc(100vh - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	width: 100%;
	box-sizing: border-box;
	padding: 16px 16px;
	display: flex;
	flex-direction: column;
	gap: 22px;
`;

export const UserWrap = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const UserFlexWrap = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
`;

export const UserProfileImg = styled.article`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	overflow: hidden;
	cursor: pointer;
	flex-shrink: 0;
`;

export const UserFollowImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const UserContent = styled.article`
	display: flex;
	flex-direction: column;
	gap: 6px;
	cursor: pointer;
`;

export const UserFollowNickName = styled.p`
	color: black;
	font-size: 14px;
	font-family: 'Suit-Bold';
`;

export const UserFollowIntro = styled.p`
	color: black;
	font-size: 12px;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
`;

export const ScrollRef = styled.div`
	width: 100%;
	height: 5px;
`;

export const LoadingText = styled.span`
	display: block;
	width: 100%;
	margin: 0 auto;

	font-family: 'SUIT-Bold';
	font-size: 16px;
	text-align: center;
	color: black;
`;

export const FollowTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
