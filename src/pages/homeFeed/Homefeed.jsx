import React, { useState, useEffect, useRef } from 'react';
import { PostDeleteContext } from '../post/PostDeleteContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	NavbarWrap,
	TitleLogo,
} from '../../components/navbar/navbar.style.jsx';
import { HomefeedWrap, SearchIcon } from '../homeFeed/homefeed.style.jsx';
import { API_URL } from '../../api.js';
import HomeFollower from './HomeFollower';
import NoFeed from './NoFeed.jsx';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import Loading from '../../components/loading/Loading.jsx';
import { Helmet } from 'react-helmet';

import { useInfiniteQuery } from '@tanstack/react-query'; //react-query
import { useInView } from 'react-intersection-observer'; //라이브러리

export default function Homefeed() {
	const url = API_URL;
	const token = localStorage.getItem('token');
	const [deletedPostId, setDeletedPostId] = useState(null);
	const navigate = useNavigate();

	const [ref, inView] = useInView();
	const count = useRef(0);

	// 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청
	const getHomefeed = async (pageParam) => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/post/feed/?limit=10&skip=${pageParam}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});

			const { posts } = res.data;

			return {
				data: posts,
				nextPage: pageParam,
				isLast: posts.length % 10 !== 0,
			};
		} catch (error) {
			console.log('에러입니다');
		}
	};

	const {
		data: followingFeedData,
		isLoading,
		fetchNextPage,
	} = useInfiniteQuery(
		['getFollowingFeed'],
		({ pageParam = count.current }) => getHomefeed(pageParam),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
		}
	);

	console.log(followingFeedData?.pages);
	console.log(count.current);
	console.log(inView);

	useEffect(() => {
		if (!isLoading) {
			if (inView && !followingFeedData?.pages[count.current].isLast) {
				count.current += 1;
				fetchNextPage();
			}
		}
	}, [inView]);

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
				<div ref={ref}></div>

				{!isLoading && followingFeedData?.pages[0].data.length === 0 && (
					<NoFeed />
				)}
				<BottomNavContainer home />
				{isLoading && <Loading />}
			</HomefeedWrap>
		</>
	);
}
