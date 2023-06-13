import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 72px 16px 0;
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
	border: solid 1px #dbdbdb;
	border-radius: 50%;
`;

export const UserContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const UserFollowNickName = styled.span`
	font-size: 14px;
	font-weight: 700;
`;

export const UserFollowIntro = styled.span`
	font-size: 12px;
	font-weight: 400;
`;
