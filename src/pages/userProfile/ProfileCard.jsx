import React from 'react';
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
} from './Profile.style.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
	delUnFollow,
	getMyInfo,
	getUserInfo,
	postFollow,
} from '../../api/profileApi.js';
import profilePic from '../../assets/image/profilePic.png';
import { ProfileImage } from './myProfileEdit.style.jsx';
import {
	ChatShare,
	ProfileButton,
} from '../../components/button/button.style.jsx';
import Loading from '../../components/loading/Loading.jsx';

export const ProfileCard = () => {
	const navigate = useNavigate();
	const myaccountname = localStorage.getItem('userAccountName');
	const accountname = useParams().accountUsername;
	const queryClient = useQueryClient();

	const { data: profile, isLoading } = useQuery(
		// 매개변수 accountname 값이 변경될 때 마다 재요청
		['profileData', accountname],
		() => (accountname ? getUserInfo(accountname) : getMyInfo())
	);

	const handleFollowChange = async (e) => {
		e.preventDefault();
		if (profile.isfollow) {
			delFollowMutaion.mutate(accountname);
		} else {
			postFollowMutaion.mutate(accountname);
		}
	};

	const delFollowMutaion = useMutation(delUnFollow, {
		onSuccess: () => {
			queryClient.invalidateQueries('profileData');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const postFollowMutaion = useMutation(postFollow, {
		onSuccess: () => {
			queryClient.invalidateQueries('profileData');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};
	return (
		<>
			{profile && !isLoading ? (
				<ProfileWrapper>
					<ProfileImgWrap>
						<FollowerWrap
							to={accountname ? './follower' : `./${myaccountname}/follower`}
						>
							<FollowerNumber followers>{profile.followerCount}</FollowerNumber>
							<Follower>followers</Follower>
						</FollowerWrap>

						<ProfileImage
							style={{ width: '110px', height: '110px' }}
							src={profile.image}
							onError={handleImgError}
							alt={`${profile.accountname}의 프로필입니다.`}
						></ProfileImage>

						<FollowerWrap
							to={accountname ? './following' : `./${myaccountname}/following`}
						>
							<FollowerNumber>{profile.followingCount}</FollowerNumber>
							<Follower>followings</Follower>
						</FollowerWrap>
					</ProfileImgWrap>

					<UserWrap>
						<UserNickName>{profile.username}</UserNickName>
						<UserEmail>@ {profile.accountname}</UserEmail>
						<Intro>{profile.intro}</Intro>
					</UserWrap>

					{!accountname ? (
						<ProfileButtonWrap>
							<ProfileButton
								type='button'
								onClick={() => {
									navigate('./edit', {
										state: {
											profile: profile,
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
								follow={profile.isfollow === true ? false : true}
								type='button'
								onClick={(e) => handleFollowChange(e)}
							>
								{profile.isfollow === true ? '팔로우 취소' : '팔로우'}
							</ProfileButton>
							<ChatShare type='button' />
						</ProfileButtonWrap>
					)}
				</ProfileWrapper>
			) : (
				isLoading && <Loading />
			)}
		</>
	);
};
