import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProfilePageWrapper = styled.div`
	height: calc(100vh - 50px - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const ProfileWrapper = styled.section`
	width: 100%;
	position: relative;
	box-sizing: border-box;
	padding: 26px 60px;
	background-color: #fff;
`;

export const UserNickName = styled.h2`
	font-size: 16px;
	font-family: 'Suit-Bold';
	/* font-weight: 700; */
	color: #000;
`;

export const UserEmail = styled.span`
	display: block;
	font-size: 12px;
	color: #767676;
	margin: 6px 0 16px;
`;

export const Intro = styled.span`
	display: block;
	font-size: 14px;
	color: #767676;
`;

export const FollowerNumber = styled.span`
	display: block;
	font-family: 'Suit-Bold';
	font-size: 18px;
	/* font-weight: 700; */
	color: ${({ followers }) => (followers === true ? `#000` : `#767676`)};
`;

export const Follower = styled.span`
	display: block;
	font-size: 8px;
	font-weight: 400;
	color: #767676;
`;

export const FollowerWrap = styled(Link)`
	width: 55px;
	flex-shrink: 0;
	border: 0;
	background-color: transparent;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	cursor: pointer;
`;

export const ProfileImgWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 42px;
`;

export const UserWrap = styled.div`
	text-align: center;
	margin: 16px 0 24px;
`;

export const ProfileButtonWrap = styled.div`
	display: flex;
	justify-content: center;
	gap: 12px;
`;

export const ProfileTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
