import React from 'react';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import {
	UserContent,
	UserFlexWrap,
	UserFollowIntro,
	UserFollowNickName,
	UserProfileImg,
	UserWrap,
	Wrapper,
} from './follow.style';
import { FollowButton } from '../../components/button/button.style';

export default function Follwers() {
	return (
		<Wrapper>
			<NavbarWrap>
				<Backspace />
				<NavbarTitle>Followings</NavbarTitle>
			</NavbarWrap>

			<UserWrap>
				<UserFlexWrap>
					<UserProfileImg></UserProfileImg>
					<UserContent>
						<UserFollowNickName>애월읍 한라봉 최고 맛집</UserFollowNickName>
						<UserFollowIntro>정성을 다해 농사짓는 한라봉</UserFollowIntro>
					</UserContent>
				</UserFlexWrap>
				<FollowButton follow>팔로우</FollowButton>
			</UserWrap>

			<UserWrap>
				<UserFlexWrap>
					<UserProfileImg></UserProfileImg>
					<UserContent>
						<UserFollowNickName>나 감귤 좋아하네</UserFollowNickName>
						<UserFollowIntro>감귤농장 컬렉터 i love mandarin</UserFollowIntro>
					</UserContent>
				</UserFlexWrap>
				<FollowButton>취소</FollowButton>
			</UserWrap>
		</Wrapper>
	);
}
