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
	const [post, setPost] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	const [deletedPostId, setDeletedPostId] = useState(null);
	const navigate = useNavigate();
	// const [followingFeed, setFollowingFeed] = useState([]);

	const [hasNextPage, setHasNextPage] = useState(true);

	const [ref, inView] = useInView();
	const count = useRef(0);

	const {
		data: followingFeed,
		isLoading,
		fetchNextPage,
	} = useInfiniteQuery(
		['getFeedPosts'],
		({ pageParam = count.current }) => getHomefeed(pageParam),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
		}
	);
	// inView가 true 일때만 실행
	useEffect(() => {
		if (inView && !followingFeed?.pages[count.current].isLast) {
			count.current += 1;
			fetchNextPage();
		}
	}, [inView]);

	// 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청
	const getHomefeed = async (pageParam) => {
		// setPost([]);
		const res = await axios({
			method: 'GET',
			url: `${url}/post/feed/?limit=10&skip=${pageParam}`,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});
		// setFollowingFeed(res.data.posts);
		const { posts } = res.data.posts;

		return {
			data: posts,
			nextPage: pageParam,
			isLast: !res.data.next,
		};
	};

	useEffect(() => {
		if (followingFeed && followingFeed.length !== 0) {
			setPost([]);
			const newPosts = followingFeed.map((item) => (
				<PostDeleteContext.Provider
					key={item.id}
					value={{ deletedPostId, setDeletedPostId }}
				>
					<HomeFollower postId={item.id} />
				</PostDeleteContext.Provider>
			));
			setPost(newPosts);
		}
	}, [followingFeed]);

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
				{followingFeed && followingFeed.length !== 0
					? post
					: isLoading &&
					  (!post || (followingFeed && followingFeed.length === 0)) && (
							<NoFeed />
					  )}
				<div ref={ref} />
				<BottomNavContainer home />
				{!isLoading && <Loading />}
			</HomefeedWrap>
		</>
	);
}
