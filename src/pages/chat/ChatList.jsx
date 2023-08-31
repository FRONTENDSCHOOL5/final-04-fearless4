import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Helmet } from 'react-helmet-async';
import { ChatTitle } from './chat.style';

const Date = styled.time`
	margin-bottom: auto;
	padding-top: 10px;
	font-size: 10px;
`;

const ChatWrap = styled.main`
	height: calc(100vh - 50px - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
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

const linkStyle = {
	color: 'black',
};

export default function ChatList() {
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
				<ChatTitle>채팅 목록</ChatTitle>

				<article>
					<Link to='/chat/여행조아/' style={linkStyle}>
						<UserFlexWrap>
							<ProfileWrap>
								<UserProfileImg>
									<UserFollowImage src={Chatprofile2} alt='프로필 이미지' />
								</UserProfileImg>
								<UserContent>
									<UserFollowNickName>여행조아</UserFollowNickName>
									<UserFollowIntro>
										안녕하세요~ 올려주신 상품을 보다가 궁금한 점이 있어서 메시지
										남깁니다.
									</UserFollowIntro>
								</UserContent>
							</ProfileWrap>
							<Date>23.06.20</Date>
						</UserFlexWrap>
					</Link>
				</article>
				<article>
					<Link to='/chat/choi/' style={linkStyle}>
						<UserFlexWrap>
							<ProfileWrap>
								<UserProfileImg>
									<UserFollowImage src={ChatProfile} alt='프로필 이미지' />
								</UserProfileImg>
								<UserContent>
									<UserFollowNickName>choi</UserFollowNickName>
									<UserFollowIntro>
										안녕하세요! 판매중이신 상품들 중에 친구들과 가기 좋은 곳이
										어디있을까요?
									</UserFollowIntro>
								</UserContent>
							</ProfileWrap>
							<Date>23.06.20</Date>
						</UserFlexWrap>
					</Link>
				</article>
			</ChatWrap>

			<BottomNavContainer message />
		</>
	);
}
