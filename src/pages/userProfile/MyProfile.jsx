import React, { useState, useEffect } from 'react';
import { ProfileButton } from '../../components/button/button.style';
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
import { ModalText, ModalWrap } from '../../components/modal/modal.style';
import axios from 'axios';
export default function UserProfile() {
	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const url = 'https://api.mandarin.weniv.co.kr';
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjI2YzkyYjJjYjIwNTY2MzliZjg4ZCIsImV4cCI6MTY5MTgyMTIxMywiaWF0IjoxNjg2NjM3MjEzfQ.qEBk3V1ntQiSjVgujCAs8TDGX2HKy9FlJyCymPD866A';

	const profileData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/nonamukza`,
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
	// console.log(profile.profile.followerCount);

	useEffect(() => {
		profileData();
	}, []);

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	return (
		<>
			<ProfileWrapper>
				<NavbarWrap profile='true'>
					<Backspace />
					<OptionModalTab />
				</NavbarWrap>

				{isLoading && (
					<>
						<ProfileImgWrap>
							<FollowerWrap>
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

							<FollowerWrap>
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
							<ProfileButton type='button'>프로필 수정</ProfileButton>
							<ProfileButton product type='button'>
								상품 등록
							</ProfileButton>
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
