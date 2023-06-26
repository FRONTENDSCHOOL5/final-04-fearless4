import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import Chatprofile2 from '../../assets/image/chatProfile2.jpg';
import {
	UserProfileImg,
	UserFollowImage,
	UserContent,
	UserFollowNickName,
	UserFollowIntro,
	ProfileWrap,
} from '../follow/follow.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import ChatProfile from '../../assets/image/chatProfile.jpg';
import { ProfileWrapper } from '../userProfile/userProfile.style';

export default function ChatList() {
	const Date = styled.span`
		margin-bottom: auto;
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

	const ProfileWrap = styled.div`
		display: flex;
		gap: 12px;
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
						navigate('/chat2');
					}}
				>
					<ProfileWrap>
						<UserProfileImg>
							<UserFollowImage src={Chatprofile2} />
						</UserProfileImg>
						<UserContent>
							<UserFollowNickName>여행조아</UserFollowNickName>
							<UserFollowIntro>
								안녕하세요~ 올려주신 상품을 보다가 궁금한 점이 있어서 메시지
								남깁니다...
							</UserFollowIntro>
						</UserContent>
					</ProfileWrap>
					<Date>23.06.20</Date>
				</UserFlexWrap>
				<UserFlexWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
					<ProfileWrap>
						<UserProfileImg>
							<UserFollowImage src={ChatProfile} />
						</UserProfileImg>
						<UserContent>
							<UserFollowNickName>choi</UserFollowNickName>
							<UserFollowIntro>
								안녕하세요! 판매중이신 상품들 중에...
							</UserFollowIntro>
						</UserContent>
					</ProfileWrap>
					<Date>23.06.20</Date>
				</UserFlexWrap>
			</ChatWrap>
			<BottomNavContainer message />
		</>
	);
}
