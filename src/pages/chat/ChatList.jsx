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
	UserWrap,
	UserProfileImg,
	UserFollowImage,
	UserContent,
	UserFollowNickName,
	UserFollowIntro,
} from '../follow/follow.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import ChatProfile from '../../assets/image/chatProfile.jpg';

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
						navigate('/chat2');
					}}
				>
<<<<<<< HEAD
					<UserProfileImg>
						<UserFollowImage src={ProfilePic} />
					</UserProfileImg>
					<UserContent>
						<UserFollowNickName>애월읍 위니브 감귤농장</UserFollowNickName>
						<UserFollowIntro>이번에 정정 언제하맨마씸?</UserFollowIntro>
					</UserContent>
=======
					<UserFlexWrap>
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
					</UserFlexWrap>
>>>>>>> 26d2fac9462d91203f000920b3931ed696a78da7
					<Date>23.06.23</Date>
				</UserFlexWrap>
				<UserFlexWrap
					onClick={() => {
						navigate('/chat');
					}}
				>
<<<<<<< HEAD
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

=======
					<UserFlexWrap>
						<UserProfileImg>
							<UserFollowImage src={ChatProfile} />
						</UserProfileImg>
						<UserContent>
							<UserFollowNickName>choi</UserFollowNickName>
							<UserFollowIntro>
								안녕하세요! 판매중이신 상품들 중에...
							</UserFollowIntro>
						</UserContent>
					</UserFlexWrap>
					<Date>23.06.20</Date>
				</UserWrap>
			</Wrapper2>
>>>>>>> 26d2fac9462d91203f000920b3931ed696a78da7
			<BottomNavContainer message />
		</>
	);
}
