import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import ProfilePic from '../../assets/image/profilePic.png';

import {
	UserWrap,
	UserProfileImg,
	UserFollowImage,
	UserContent,
	UserFollowNickName,
	UserFollowIntro,
} from '../follow/follow.style';
import styled from 'styled-components';

import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';

export default function ChatList() {
	const Date = styled.span`
		margin-left: auto;
		font-size: 10px;
	`;

	const ChatWrap = styled.div`
		width: 100%;
		height: calc(100vh - 100px);
	`;

	const UserFlexWrap = styled.div`
		display: flex;
		padding: 12px 16px;
		align-items: center;
		gap: 12px;
		justify-content: space-between;
		cursor: pointer;
	`;

	const navigate = useNavigate();

	return (
		<>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<OptionModalTab />
			</NavbarWrap>
			<ChatWrap>
				<UserFlexWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
					<UserProfileImg>
						<UserFollowImage src={ProfilePic} />
					</UserProfileImg>
					<UserContent>
						<UserFollowNickName>애월읍 위니브 감귤농장</UserFollowNickName>
						<UserFollowIntro>이번에 정정 언제하맨마씸?</UserFollowIntro>
					</UserContent>
					<Date>23.06.23</Date>
				</UserFlexWrap>
				<UserFlexWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
					<UserProfileImg>
						<UserFollowImage src={ProfilePic} />
					</UserProfileImg>
					<UserContent>
						<UserFollowNickName>제주감귤마을</UserFollowNickName>
						<UserFollowIntro>
							깊은 어둠의 존재감, 롤스로이스 뉴 블랙 배치..
						</UserFollowIntro>
					</UserContent>
					<Date>23.06.20</Date>
				</UserFlexWrap>
			</ChatWrap>

			<BottomNavContainer message />
		</>
	);
}
