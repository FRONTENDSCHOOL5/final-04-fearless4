import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import { Wrapper } from './follow.style';
import FollowUnknown from './FollowUnknown';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFollow } from '../../api/followApi';
import FollowItem from './FollowItem';

export default function Follwers() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const accountUsername = useParams().accountUsername;
	const followPage = useParams().follow;
	const myAccountName = localStorage.getItem('userAccountName');
	const count = useRef(0);
	const [ref, inView] = useInView();
	const [hasNextPage, setHasNextPage] = useState(true);

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

	return (
		<>
			<Helmet>
				<title>{`TravelUs | ${
					followPage === 'follower' ? '팔로워' : '팔로잉'
				}`}</title>
			</Helmet>
			<NavbarWrap>
				<Backspace
					aria-label='뒤로가기'
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
								return <FollowItem key={follow._id} follow={follow} />;
							})
					  )
					: !isLoading && <FollowUnknown />}
				{isLoading && <Loading />}
				{hasNextPage && <div ref={ref} />}
			</Wrapper>
		</>
	);
}
