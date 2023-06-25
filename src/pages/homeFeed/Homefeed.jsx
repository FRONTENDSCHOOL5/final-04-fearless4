import React, { useState, useEffect, useContext } from 'react';
import { PostDeleteContext } from '../post/PostDeleteContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	NavbarWrap,
	TitleLogo,
} from '../../components/navbar/navbar.style.jsx';
import { SearchIcon } from '../homeFeed/homefeed.style.jsx';
import { API_URL } from '../../api.js';
import HomeFollower from './HomeFollower';
import NoFeed from './NoFeed.jsx';
export default function Homefeed() {
	const url = API_URL;
	const token = localStorage.getItem('token');
	const [followingFeed, setFollowingFeed] = useState([]);
	const [post, setPost] = useState([]);
	const [deletedPostId, setDeletedPostId] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const homeFeedData = async () => {
			try {
				setPost([]);
				const res = await axios({
					method: 'GET',
					url: `${url}/post/feed/?limit=infinity`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				setFollowingFeed(res.data.posts);
			} catch (error) {
				console.log('에러입니다', error);
			}
		};
		homeFeedData();
	}, [url]);

	useEffect(() => {
		if (followingFeed.length !== 0) {
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
			<NavbarWrap spaceBetween>
				<TitleLogo />
				<SearchIcon
					onClick={() => {
						navigate('/Search');
					}}
					alt='검색 아이콘'
				/>
			</NavbarWrap>

			{followingFeed.length === 0 ? <NoFeed /> : post}
		</>
	);
}
