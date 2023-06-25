import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: calc(100vh - 48px);
	box-sizing: border-box;
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const UserWrap = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const UserFlexWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const UserProfileImg = styled.div`
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

export const UserContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	cursor: pointer;
`;

export const UserFollowNickName = styled.span`
	font-size: 14px;
	font-family: 'Suit-Bold';
`;

export const UserFollowIntro = styled.span`
	font-size: 12px;
	font-weight: 400;
`;
