import React, { useEffect, useState } from 'react';
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
import { ProfileImage } from '../profileSetup/profileSetup.style';
import userNoneProfile from '../../assets/image/profilePic.png';

export default function Follwers() {
	const [follower, setFollower] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const url = 'https://api.mandarin.weniv.co.kr';
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjI2YzkyYjJjYjIwNTY2MzliZjg4ZCIsImV4cCI6MTY5MTgyMTIxMywiaWF0IjoxNjg2NjM3MjEzfQ.qEBk3V1ntQiSjVgujCAs8TDGX2HKy9FlJyCymPD866A';

	const followerData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/nonamukza/follower`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setIsLoading(true);
			setFollower(res.data);
			// console.log(res.data);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};
	console.log(follower);

	useEffect(() => {
		followerData();
	}, []);

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<Wrapper>
			<NavbarWrap>
				<Backspace />
				<NavbarTitle>Followers</NavbarTitle>
			</NavbarWrap>
			{isLoading &&
				follower.map((item) => {
					return (
						<UserWrap key={item._id}>
							<UserFlexWrap>
								<UserProfileImg>
									<ProfileImage
										src={item.image}
										onError={handleImgError}
										alt='유저 프로필 이미지입니다.'
									/>
								</UserProfileImg>
								<UserContent>
									<UserFollowNickName>{item.username}</UserFollowNickName>
									<UserFollowIntro>{item.intro}</UserFollowIntro>
								</UserContent>
							</UserFlexWrap>
							<FollowButton follow={item.isfollow}>
								{item.isfollow === true ? '취소' : '팔로우'}
							</FollowButton>
						</UserWrap>
					);
				})}
		</Wrapper>
	);
}
