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
	const Wrapper = styled.div`
		width: 100%;
		box-sizing: border-box;
		padding: 60px 16px 0px 24px;
		display: flex;
		flex-direction: column;
	`;
	const Wrapper2 = styled.div`
		width: 100%;
		box-sizing: border-box;
		padding: 30px 16px 0px 24px;
		display: flex;
		flex-direction: column;
	`;

	const UserFlexWrap = styled.div`
		display: flex;
		align-items: center;
		gap: 12px;
		justify-content: space-between;
		cursor: pointer;
	`;

	const navigate = useNavigate();

	return (
		<div>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<OptionModalTab />
			</NavbarWrap>
			<Wrapper>
				<UserWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
					<UserFlexWrap>
						<UserProfileImg>
							<UserFollowImage src={ProfilePic} />
						</UserProfileImg>
						<UserContent>
							<UserFollowNickName>애월읍 위니브 감귤농장</UserFollowNickName>
							<UserFollowIntro>이번에 정정 언제하맨마씸?</UserFollowIntro>
						</UserContent>
					</UserFlexWrap>
					<Date>23.06.23</Date>
				</UserWrap>
			</Wrapper>
			<Wrapper2>
				<UserWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
					<UserFlexWrap>
						<UserProfileImg>
							<UserFollowImage src={ProfilePic} />
						</UserProfileImg>
						<UserContent>
							<UserFollowNickName>제주감귤마을</UserFollowNickName>
							<UserFollowIntro>
								깊은 어둠의 존재감, 롤스로이스 뉴 블랙 배치..
							</UserFollowIntro>
						</UserContent>
					</UserFlexWrap>
					<Date>23.06.20</Date>
				</UserWrap>
			</Wrapper2>

			<BottomNavContainer />
		</div>
	);
}
