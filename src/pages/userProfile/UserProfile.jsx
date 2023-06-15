import React from 'react';
import { ChatShare, ProfileButton } from '../../components/button/button.style';
import {
	ProfileWrapper,
	Intro,
	UserEmail,
	UserNickName,
	Follower,
	FollowerNumber,
	FollowerWrap,
	ProfileImgWrap,
	UserWrap,
	ProfileButtonWrap,
} from './userProfile.style';
import { ProfileImage } from '../profileSetup/profileSetup.style';
import profilePic from '../../assets/image/profilePic.png';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import { ModalWrap, ModalText } from '../../components/modal/modal.style';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
export default function UserProfile() {
	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const accountname = 'jun1';

	const url = 'https://api.mandarin.weniv.co.kr';
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2YzNmM4YjJjYjIwNTY2MzJkNjBiZiIsImV4cCI6MTY5MTk3Njg3OSwiaWF0IjoxNjg2NzkyODc5fQ.vwMFkmxyEbUjd6xeOB1cTXiJqR10z1CqIpsoDClB1hc';

	const profileData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/${accountname}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setIsLoading(true);
			setProfile(res.data);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		profileData();
	}, []);

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};
	return (
		<>
			<ProfileWrapper>
				<NavbarWrap spaceBetween>
					<Backspace />
					<OptionModalTab />
				</NavbarWrap>
				{isLoading && (
					<>
						<ProfileImgWrap>
							<FollowerWrap
								to='/followers'
								state={{
									accountname: accountname,
									token: token,
								}}
							>
								<FollowerNumber followers>
									{profile.profile.followerCount}
								</FollowerNumber>
								<Follower>followers</Follower>
							</FollowerWrap>

							<ProfileImage
								style={{ width: '110px', height: '110px' }}
								src={profile.profile.image}
								onError={handleImgError}
								alt=''
							></ProfileImage>

							<FollowerWrap
								to='/followings'
								state={{ accountname: accountname, token: token }}
							>
								<FollowerNumber>
									{profile.profile.followingCount}
								</FollowerNumber>
								<Follower>followings</Follower>
							</FollowerWrap>
						</ProfileImgWrap>

						<UserWrap>
							<UserNickName>{profile.profile.accountname}</UserNickName>
							<UserEmail>@ {profile.profile.accountname}</UserEmail>
							<Intro>{profile.profile.intro}</Intro>
						</UserWrap>

						<ProfileButtonWrap>
							<ChatShare type='button' chatting />
							<ProfileButton follow type='button'>
								팔로우
							</ProfileButton>
							<ChatShare type='button' />
						</ProfileButtonWrap>
					</>
				)}
				<ModalWrap>
					<ModalText>설정 및 개인정보</ModalText>
					<ModalText>로그아웃</ModalText>
				</ModalWrap>
			</ProfileWrapper>
		</>
	);
}
