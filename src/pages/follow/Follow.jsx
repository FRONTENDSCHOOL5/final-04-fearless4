import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import {
	LoadingText,
	ScrollRef,
	UserContent,
	UserFlexWrap,
	UserFollowImage,
	UserFollowIntro,
	UserFollowNickName,
	UserProfileImg,
	UserWrap,
	Wrapper,
} from './follow.style';
import { FollowButton, MoreButton } from '../../components/button/button.style';
import axios from 'axios';
import userNoneProfile from '../../assets/image/profilePic.png';
import { API_URL } from '../../api';
import FollowUnknown from './FollowUnknown';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollow } from '../../api/followApi';

export default function Follwers() {
	// const [follower, setFollower] = useState([]);
	const [newFollow, setNewFollow] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const accountUsername = useParams().accountUsername;
	const followPage = useParams().follow;
	const token = localStorage.getItem('token');
	const myAccountName = localStorage.getItem('userAccountName');
	const url = API_URL;
	const count = useRef(0);
	const [ref, inView] = useInView();
	// const [skip, setSkip] = useState(0);
	// const [hasNextPage, setHasNextPage] = useState(true);

	const {
		data: followData,
		isLoading,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		['getFollowData'],
		({
			accountname = accountUsername ? myAccountName : accountUsername,
			pageParam = count.current,
			follow = followPage,
		}) => getFollow(accountname, pageParam, follow),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
		}
	);
	console.log(followData);

	useEffect(() => {
		if (!isLoading) {
			if (inView) {
				count.current += 1;
				fetchNextPage();
			}
		}
	}, [inView, isLoading]);

	useEffect(() => {
		const newFollowList = followData?.pages.map((page) =>
			page.data.map((follow) => {
				return (
					<UserWrap key={follow._id}>
						<UserFlexWrap>
							<UserProfileImg
								onClick={() => {
									myAccountName === follow.accountname
										? navigate('../../../profile')
										: navigate(`../../${follow.accountname}`);
								}}
							>
								<UserFollowImage
									src={follow.image}
									onError={handleImgError}
									alt={`${follow.username} 프로필 이미지입니다.`}
								/>
							</UserProfileImg>
							<UserContent
								onClick={() => {
									myAccountName === follow.accountname
										? navigate('../../../profile')
										: navigate(`../../${follow.accountname}`);
								}}
							>
								<UserFollowNickName>{follow.username}</UserFollowNickName>
								<UserFollowIntro>{follow.intro}</UserFollowIntro>
							</UserContent>
						</UserFlexWrap>
						{!(myAccountName === follow.accountname) && (
							<FollowButton
								type='button'
								follow={follow.isFollow}
								// onClick={(e) => {
								// 	handleFollowChange(index, item.accountname, e);
								// }}
							>
								{follow.isFollow === true ? '취소' : '팔로우'}
							</FollowButton>
						)}
					</UserWrap>
				);
			})
		);
		setNewFollow(newFollowList);
	}, [followData]);

	// const followerData = async () => {
	// 	try {
	// 		const res = await axios({
	// 			method: 'GET',
	// 			url: `${url}/profile/${accountname}/${follow}/?limit=10&skip=${skip}`,
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				'Content-type': 'application/json',
	// 			},
	// 		});
	// 		setIsLoading(true);
	// 		const updateFollowing = res.data.map((item) => ({
	// 			...item,
	// 			isFollow: item.isfollow,
	// 		}));
	// 		updateFollowing.length >= 10
	// 			? setHasNextPage(true)
	// 			: setHasNextPage(false);
	// 		setFollower([...follower, ...updateFollowing]);
	// 		setSkip((prev) => prev + 10);
	// 	} catch (error) {
	// 		console.log('에러입니다', error);
	// 	}
	// };

	// console.log(follower);

	// useEffect(() => {
	// 	inView && followerData();
	// }, [inView, isLoading]);

	// const handleFollowChange = async (index, accountname, e) => {
	// 	e.preventDefault();
	// 	const updateFollowing = [...follower];
	// 	updateFollowing[index].isFollow = !follower[index].isFollow;
	// 	setFollower(updateFollowing);
	// 	try {
	// 		const res = await axios({
	// 			method: !follower[index].isFollow ? 'DELETE' : 'POST',
	// 			url: `${url}/profile/${accountname}/${
	// 				!follower[index].isFollow ? 'unfollow' : 'follow'
	// 			}`,
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				'Content-type': 'application/json',
	// 			},
	// 		});
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log('에러입니다', error);
	// 	}
	// };

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<>
			<Helmet>
				<title>{`TravelUs | ${
					followPage === 'follower' ? '팔로워' : '팔로잉'
				}`}</title>
			</Helmet>
			<NavbarWrap>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<NavbarTitle>{`${
					followPage === 'follower' ? 'Followers' : 'Followings'
				}`}</NavbarTitle>
			</NavbarWrap>
			<Wrapper>
				{followData?.pages[0].data.length > 0
					? newFollow
					: !isLoading && <FollowUnknown />}
				{isLoading && <Loading />}
				{hasNextPage && (
					<>
						<div ref={ref} />
					</>
				)}
			</Wrapper>
		</>
	);
}
