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
} from '../follow/follow.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import ChatProfile from '../../assets/image/chatProfile.jpg';
import { Helmet } from 'react-helmet';

export default function ChatList() {
	const Date = styled.time`
		margin-bottom: auto;
		font-size: 10px;
	`;

	const ChatWrap = styled.div`
		height: calc(100vh - 50px - 50px);
		overflow-x: hidden;
		overflow-y: scroll;
		::-webkit-scrollbar {
			width: 0px;
		}
	`;

	const UserFlexWrap = styled.article`
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
			<Helmet>
				<title>TravelUs | 채팅</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace
					aria-label='뒤로가기'
					onClick={() => {
						navigate(-1);
					}}
				/>
				<OptionModalTab aria-label='더보기' />
			</NavbarWrap>
			<ChatWrap>
				<UserFlexWrap
					onClick={() => {
						navigate('./여행조아');
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
						navigate('./choi');
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
