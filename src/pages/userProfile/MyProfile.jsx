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
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../api';

export default function UserProfile() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [profileImage, setProfileImage] = useState('');
	const [profileName, setProfileName] = useState('');
	const [profileId, setProfileId] = useState('');
	const [profileIntro, setProfileIntro] = useState('');

	const url = API_URL;
	const token = localStorage.getItem('token');

	const profileData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/user/myinfo`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setIsLoading(true);
			setProfile(res.data);
			console.log(res.data);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		profileData();
	}, []);

	useEffect(() => {
		if (isLoading === true) {
			setProfileImage(profile.user.image);
			setProfileId(profile.user.accountname);
			setProfileName(profile.user.username);
			setProfileIntro(profile.user.intro);
		}
	}, [isLoading]);

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
									accountname: profile.user.accountname,
								}}
							>
								<FollowerNumber followers>
									{profile.user.followerCount}
								</FollowerNumber>
								<Follower>followers</Follower>
							</FollowerWrap>

							<ProfileImage
								style={{ width: '110px', height: '110px' }}
								src={profile.user.image}
								onError={handleImgError}
								alt=''
							></ProfileImage>

							<FollowerWrap
								to='/followings'
								state={{
									accountname: profile.user.accountname,
								}}
							>
								<FollowerNumber>{profile.user.followingCount}</FollowerNumber>
								<Follower>followings</Follower>
							</FollowerWrap>
						</ProfileImgWrap>

						<UserWrap>
							<UserNickName>{profile.user.username}</UserNickName>
							<UserEmail>@ {profile.user.accountname}</UserEmail>
							<Intro>{profile.user.intro}</Intro>
						</UserWrap>

						<ProfileButtonWrap>
							<ProfileButton
								type='button'
								onClick={() => {
									navigate('/myprofileedit', {
										state: {
											token: token,
											profileImage: profileImage,
											profileId: profileId,
											profileName: profileName,
											profileIntro: profileIntro,
										},
									});
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
