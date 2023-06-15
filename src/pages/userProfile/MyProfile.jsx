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
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const accountname = 'jun';

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
				<NavbarWrap profile='true'>
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
							<ProfileButton
								type='button'
								onClick={() => {
									navigate('/myprofileedit', { state: { token: token } });
								}}
							>
								프로필 수정
							</ProfileButton>

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
