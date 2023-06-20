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
	ProfilePageWrapper,
} from './userProfile.style';
import { ProfileImage } from '../profileSetup/profileSetup.style';
import profilePic from '../../assets/image/profilePic.png';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import {
	CheckButtonWrap,
	CheckLogout,
	CheckModalWrap,
	CheckMsg,
	DarkBackground,
	ModalText,
	ModalWrap,
} from '../../components/modal/modal.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../api';
import ProductsForSale from './ProductsForSale';

export default function UserProfile() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [profileImage, setProfileImage] = useState('');
	const [profileName, setProfileName] = useState('');
	const [profileId, setProfileId] = useState('');
	const [profileIntro, setProfileIntro] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [isCheckModal, setIsCheckModal] = useState(false);

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

	const handleModalOpen = (e) => {
		e.preventDefault();
		setIsModal(true);
	};

	const handleModalClose = (e) => {
		e.preventDefault();
		// e.currentTarget 현재 handleModalClose가 부착된 요소
		// e.target 내가 클릭한 자식 요소
		if (e.target === e.currentTarget) {
			setIsModal(false);
			setIsCheckModal(false);
		}
	};

	const handleCheckModal = (e) => {
		e.preventDefault();
		setIsCheckModal(true);
	};

	const accountLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<>
			<ProfilePageWrapper>
				<ProfileWrapper>
					<NavbarWrap spaceBetween>
						<Backspace
							onClick={() => {
								navigate(-1);
							}}
						/>
						<OptionModalTab onClick={handleModalOpen} />
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
				</ProfileWrapper>

				<ProductsForSale />
				{isModal && (
					<DarkBackground onClick={handleModalClose}>
						<ModalWrap>
							<ModalText>설정 및 개인정보</ModalText>
							<ModalText onClick={handleCheckModal}>로그아웃</ModalText>
						</ModalWrap>
					</DarkBackground>
				)}
				{isCheckModal && (
					<DarkBackground onClick={handleModalClose}>
						<CheckModalWrap>
							<CheckMsg>로그아웃하시겠어요?</CheckMsg>
							<CheckButtonWrap>
								<CheckLogout onClick={handleModalClose}>취소</CheckLogout>
								<CheckLogout check onClick={accountLogout}>
									로그아웃
								</CheckLogout>
							</CheckButtonWrap>
						</CheckModalWrap>
					</DarkBackground>
				)}
			</ProfilePageWrapper>
		</>
	);
}
