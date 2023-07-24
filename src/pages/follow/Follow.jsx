import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import {
	UserContent,
	UserFlexWrap,
	UserFollowImage,
	UserFollowIntro,
	UserFollowNickName,
	UserProfileImg,
	UserWrap,
	Wrapper,
} from './follow.style';
import { FollowButton } from '../../components/button/button.style';
import axios from 'axios';
import userNoneProfile from '../../assets/image/profilePic.png';
import { API_URL } from '../../api';
import FollowUnknown from './FollowUnknown';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

export default function Follwers() {
	const navigate = useNavigate();
	const accountname = useParams().accountUsername;
	const follow = useParams().follow;
	const token = localStorage.getItem('token');
	const myAccountName = localStorage.getItem('userAccountName');
	const url = API_URL;
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.resetQueries();
	}, []);

	const { data, isLoading, isError, error } = useQuery(
		['followData'],
		async () => {
			try {
				const res = await axios({
					method: 'GET',
					url: `${url}/profile/${accountname}/${follow}/?limit=infinity`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				const updateFollowing = res.data.map((item) => ({
					...item,
					isFollow: item.isfollow,
				}));
				return updateFollowing;
			} catch (error) {
				console.error(error);
			}
		}
	);

	const followPost = async (accountname, index) => {
		console.log(accountname, index);
		try {
			const res = await axios({
				method: data[0].isFollow ? 'DELETE' : 'POST',
				url: `${url}/profile/${accountname}/${
					data[0].isFollow ? 'unfollow' : 'follow'
				}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
		} catch (error) {
			console.error('에러입니다', error);
		}
	};

	const FollowMutation = useMutation(followPost, {
		onSuccess: () => {
			queryClient.invalidateQueries('followData');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const handleFollowChange = (accountname, index) => {
		FollowMutation.mutate(accountname, index);
	};

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<>
			<Helmet>
				<title>{`TravelUs | ${
					follow === 'follower' ? '팔로워' : '팔로잉'
				}`}</title>
			</Helmet>
			<NavbarWrap>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<NavbarTitle>{`${
					follow === 'follower' ? 'Followers' : 'Followings'
				}`}</NavbarTitle>
			</NavbarWrap>
			<Wrapper>
				{!isLoading && data.length !== 0
					? data.map((item, index) => {
							return (
								<UserWrap key={item._id}>
									<UserFlexWrap>
										<UserProfileImg
											onClick={() => {
												navigate(`../../${item.accountname}`);
											}}
										>
											<UserFollowImage
												src={item.image}
												onError={handleImgError}
												alt='유저 프로필 이미지입니다.'
											/>
										</UserProfileImg>
										<UserContent
											onClick={() => {
												navigate(`../../${item.accountname}`);
											}}
										>
											<UserFollowNickName>{item.username}</UserFollowNickName>
											<UserFollowIntro>{item.intro}</UserFollowIntro>
										</UserContent>
									</UserFlexWrap>
									{!(myAccountName === item.accountname) && (
										<FollowButton
											type='button'
											follow={item.isFollow}
											onClick={() => {
												handleFollowChange(item.accountname, index);
											}}
										>
											{item.isFollow === true ? '취소' : '팔로우'}
										</FollowButton>
									)}
								</UserWrap>
							);
					  })
					: !isLoading &&
					  myAccountName &&
					  (!data || data.length === 0) && <FollowUnknown />}
				{isLoading && <Loading />}
			</Wrapper>
		</>
	);
}
