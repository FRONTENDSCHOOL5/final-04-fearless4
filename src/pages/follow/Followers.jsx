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
import axios from 'axios';

export default function Follwers() {
	const url = 'https://api.mandarin.weniv.co.kr';
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjRlMmQ2YjJjYjIwNTY2M2UxZGVhYSIsImV4cCI6MTY5MTMzODUwMSwiaWF0IjoxNjg2MTU0NTAxfQ.4g3BNHZUeVB-a5MXVgMLfX5jGNYnbs6NP0-fr4Jx3NM';

	const followerData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/camperz_/follower`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			console.log(res);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	return (
		<Wrapper>
			<NavbarWrap>
				<Backspace />
				<NavbarTitle>Followers</NavbarTitle>
				<button type='button' onClick={followerData}>
					임시 팔로우 버튼
				</button>
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
