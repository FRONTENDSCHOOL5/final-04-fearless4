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

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'; //react-query
import { useInView } from 'react-intersection-observer'; //라이브러리
import getHomefeed from '../../api/homefeedApi.js';
import Topbtn from '../../components/button/Topbtn.jsx';

export default function Homefeed() {
	const [deletedPostId, setDeletedPostId] = useState(null);
	const navigate = useNavigate();
	const [ref, inView] = useInView();
	const count = useRef(0);
	const [newPost, setPost] = useState([]);
	const queryClient = useQueryClient();
	const [showButton, setShowButton] = useState(false);
	const homefeedWrap = document.getElementById('homefeed-wrap');

	const {
		data: followingFeedData,
		isLoading,
		fetchNextPage,
	} = useInfiniteQuery(
		['getFeedPosts'],
		({ pageParam = count.current }) => getHomefeed(pageParam),
		{
			getNextPageParam: (lastPage) => lastPage.nextPage + 10,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (!isLoading) {
			if (inView && !followingFeedData?.pages[count.current].isLast) {
				count.current += 1;
				fetchNextPage();
			}
		}
	}, [inView]);

	useEffect(() => {
		queryClient.removeQueries({ queryKey: 'getFeedPosts' });
	}, []);

	useEffect(() => {
		const newPosts = followingFeedData?.pages.map((page) =>
			page.data.map((post) => {
				return (
					<React.Fragment key={post.id}>
						<PostDeleteContext.Provider
							value={{ deletedPostId, setDeletedPostId }}
						>
							<HomeFollower postId={post.id} />
						</PostDeleteContext.Provider>
					</React.Fragment>
				);
			})
		);
		setPost(newPosts);
	}, [followingFeedData]);

	useEffect(() => {
		if (homefeedWrap) {
			const handleShowBtn = () => {
				if (homefeedWrap.scrollTop > 500) {
					setShowButton(true);
				} else {
					setShowButton(false);
				}
			};
			homefeedWrap.addEventListener('scroll', handleShowBtn);
			return () => {
				homefeedWrap.removeEventListener('scroll', handleShowBtn);
			};
		}
	}, [homefeedWrap]);

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
					alt='검색 버튼'
				/>
			</NavbarWrap>
			<HomefeedWrap id='homefeed-wrap'>
				{followingFeedData?.pages[0].data.length > 0
					? newPost
					: !isLoading && <NoFeed />}
				<div style={{ height: '1px' }} ref={ref} />
				{showButton && <Topbtn homefeedWrap={homefeedWrap} />}
				{isLoading && <Loading />}
			</HomefeedWrap>
			<BottomNavContainer home />
		</>
	);
}
