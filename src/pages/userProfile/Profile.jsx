import React, { useState, useEffect, useContext } from 'react';
import { PostDeleteContext } from '../post/PostDeleteContext.jsx';
import {
	ChatShare,
	ProfileButton,
} from '../../components/button/button.style.jsx';
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
} from './userProfile.style.jsx';
import { ProfileImage } from '../profileSetup/profileSetup.style.jsx';
import profilePic from '../../assets/image/profilePic.png';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style.jsx';
import {
	ModalWrap,
	ModalText,
	DarkBackground,
	CheckModalWrap,
	CheckMsg,
	CheckButtonWrap,
	CheckLogout,
} from '../../components/modal/modal.style.jsx';
import PostList from '../../components/post/PostList.jsx';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style.jsx';
import axios from 'axios';

import { API_URL } from '../../api.js';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsForSale from './ProductsForSale.jsx';
import Loading from '../../components/loading/Loading.jsx';
import { Helmet } from 'react-helmet';
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
	const [isFollow, setIsFollow] = useState();
	const [deletedPostId, setDeletedPostId] = useState(null);

	const myaccountname = localStorage.getItem('userAccountName');

	const accountname = useParams().accountUsername;

	const url = API_URL;
	const token = localStorage.getItem('token');

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
			console.log(res.data);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		profileData();
	}, [isFollow, accountname]);

	useEffect(() => {
		if (isLoading === true) {
			profile.profile.isfollow === true
				? setIsFollow(true)
				: setIsFollow(false);

			if (myaccountname === accountname) {
				setProfileImage(profile.profile.image);
				setProfileId(profile.profile.accountname);
				setProfileName(profile.profile.username);
				setProfileIntro(profile.profile.intro);
			}
		}
	}, [isLoading]);

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const handleFollowChange = async (e) => {
		e.preventDefault();
		if (isFollow === false) {
			try {
				const res = await axios({
					method: 'POST',
					url: `${url}/profile/${accountname}/follow`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				setIsFollow(true);
			} catch (error) {
				console.log('에러입니다', error);
			}
		} else {
			try {
				const res = await axios({
					method: 'DELETE',
					url: `${url}/profile/${accountname}/unfollow`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				setIsFollow(false);
			} catch (error) {
				console.log('에러입니다', error);
			}
		}
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
			<Helmet>
				<title>TravelUs | 프로필</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<OptionModalTab onClick={handleModalOpen} />
			</NavbarWrap>
			<ProfilePageWrapper>
				<ProfileWrapper>
					{isLoading && (
						<>
							<ProfileImgWrap>
								<FollowerWrap to='./follower'>
									<FollowerNumber followers>
										{profile.profile.followerCount}
									</FollowerNumber>
									<Follower>followers</Follower>
								</FollowerWrap>

								<ProfileImage
									style={{ width: '110px', height: '110px' }}
									src={profile.profile.image}
									onError={handleImgError}
									alt={`${profile.profile.accountname}의 프로필입니다.`}
								></ProfileImage>

								<FollowerWrap to='./following'>
									<FollowerNumber>
										{profile.profile.followingCount}
									</FollowerNumber>
									<Follower>followings</Follower>
								</FollowerWrap>
							</ProfileImgWrap>

							<UserWrap>
								<UserNickName>{profile.profile.username}</UserNickName>
								<UserEmail>@ {profile.profile.accountname}</UserEmail>
								<Intro>{profile.profile.intro}</Intro>
							</UserWrap>

							{myaccountname === accountname ? (
								<ProfileButtonWrap>
									<ProfileButton
										type='button'
										onClick={() => {
											navigate('./edit', {
												state: {
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

									<ProfileButton
										product
										type='button'
										onClick={() => {
											navigate('../../Product/upload');
										}}
									>
										상품 등록
									</ProfileButton>
								</ProfileButtonWrap>
							) : (
								<ProfileButtonWrap>
									<ChatShare type='button' chatting />
									<ProfileButton
										follow={isFollow === true ? false : true}
										type='button'
										onClick={handleFollowChange}
									>
										{isFollow === true ? '팔로우 취소' : '팔로우'}
									</ProfileButton>
									<ChatShare type='button' />
								</ProfileButtonWrap>
							)}
						</>
					)}
				</ProfileWrapper>
				{!isLoading && <Loading />}

				<ProductsForSale userAccountName={accountname} />
				{isLoading && (
					<PostDeleteContext.Provider
						value={{ deletedPostId, setDeletedPostId }}
					>
						{' '}
						<PostList accountname={accountname}></PostList>
					</PostDeleteContext.Provider>
				)}
			</ProfilePageWrapper>
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
			<BottomNavContainer profile />
		</>
	);
}
