import React, { useState, useEffect, useRef } from 'react';
import { PostDeleteContext } from '../post/PostDeleteContext.jsx';
import { useNavigate } from 'react-router-dom';
import {
	NavbarWrap,
	TitleLogo,
} from '../../components/navbar/navbar.style.jsx';
import { HomefeedWrap, SearchIcon } from '../homeFeed/homefeed.style.jsx';
import HomeFollower from './HomeFollower';
import NoFeed from './NoFeed.jsx';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import Loading from '../../components/loading/Loading.jsx';
import { Helmet } from 'react-helmet';

import { useInfiniteQuery } from '@tanstack/react-query'; //react-query
import { useInView } from 'react-intersection-observer'; //라이브러리
import getHomefeed from '../../api/homefeedApi.js';

export default function Homefeed() {
	const [deletedPostId, setDeletedPostId] = useState(null);
	const navigate = useNavigate();
	const [ref, inView] = useInView();
	const count = useRef(0);

	const {
		data: followingFeedData,
		isLoading,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		['getFeedPosts'],
		({ pageParam = count.current }) => getHomefeed(pageParam),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
		}
	);

	useEffect(() => {
		if (!isLoading) {
			if (inView) {
				count.current += 1;
				fetchNextPage();
			}
		}
	}, [inView]);

	console.log(followingFeedData?.pages);
	console.log(inView);

	return (
		<>
			<Helmet>
				<title>TravelUs</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<TitleLogo />
				<SearchIcon
					onClick={() => {
						navigate('/Search');
					}}
					alt='검색 아이콘'
				/>
			</NavbarWrap>
			<HomefeedWrap>
				{!isLoading && followingFeedData?.pages.length > 0 && (
					<>
						{followingFeedData.pages.map((page) =>
							page.data.map((post) => {
								return (
									<PostDeleteContext.Provider
										key={post.id}
										value={{ deletedPostId, setDeletedPostId }}
									>
										<HomeFollower postId={post.id} />
									</PostDeleteContext.Provider>
								);
							})
						)}
					</>
				)}

				{!isLoading && followingFeedData?.pages[0].data.length === 0 && (
					<NoFeed />
				)}
				<BottomNavContainer home />
				{isLoading && <Loading />}
				{hasNextPage && (
					<>
						<div ref={ref} />
					</>
				)}
			</HomefeedWrap>
		</>
	);
}
