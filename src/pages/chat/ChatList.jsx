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
						navigate('/chat2');
					}}
				>
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
			<BottomNavContainer message />
		</div>
	);
}
