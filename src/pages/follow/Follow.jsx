import React, { useEffect, useRef, useState } from 'react';
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
import userNoneProfile from '../../assets/image/profilePic.png';
import FollowUnknown from './FollowUnknown';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { delUnFollow, getFollow, postFollow } from '../../api/followApi';

export default function Follwers() {
	const navigate = useNavigate();
	const accountUsername = useParams().accountUsername;
	const followPage = useParams().follow;
	const myAccountName = localStorage.getItem('userAccountName');
	const count = useRef(0);
	const [ref, inView] = useInView();
	const [hasNextPage, setHasNextPage] = useState(true);
	const queryClient = useQueryClient();

	const {
		data: followData,
		isLoading,
		fetchNextPage,
	} = useInfiniteQuery(
		['getFollowData', accountUsername],
		({
			myName = myAccountName,
			pageParam = count.current,
			follow = followPage,
			nextPage = setHasNextPage,
		}) =>
			accountUsername
				? getFollow(accountUsername, pageParam, follow, nextPage)
				: getFollow(myName, pageParam, follow, nextPage),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (!isLoading) {
			if (inView && hasNextPage) {
				fetchNextPage();
			}
		}
	}, [inView, isLoading]);

	useEffect(() => {
		queryClient.removeQueries({ queryKey: 'getFollowData' });
	}, []);

	const handleFollowChange = async (accountname, isfollow, e) => {
		e.preventDefault();
		if (isfollow) {
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
					? followData?.pages.map((page) =>
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
												<UserFollowNickName>
													{follow.username}
												</UserFollowNickName>
												<UserFollowIntro>{follow.intro}</UserFollowIntro>
											</UserContent>
										</UserFlexWrap>
										{!(myAccountName === follow.accountname) && (
											<FollowButton
												type='button'
												follow={follow.isfollow}
												onClick={(e) => {
													handleFollowChange(
														follow.accountname,
														follow.isfollow,
														e
													);
												}}
											>
												{follow.isfollow === true ? '취소' : '팔로우'}
											</FollowButton>
										)}
									</UserWrap>
								);
							})
					  )
					: !isLoading && <FollowUnknown />}
				{isLoading && <Loading />}
				{hasNextPage && <div ref={ref} />}
			</Wrapper>
		</>
	);
}
