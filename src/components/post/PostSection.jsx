import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from './post.style';
import { API_URL } from '../../api';
import * as P from './post.style';

const PostSection = ({ accountname }) => {
	const [posts, setPosts] = useState([]);
	const token = localStorage.getItem('token');

	useEffect(() => {
		const getPostList = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/post/${accountname}/userpost`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setPosts(response.data.post);
				console.log(response);
			} catch (error) {
				console.error('데이터를 불러올 수 없습니다', error);
			}
		};
		getPostList();
	}, [accountname, token]);

	return (
		<div>
			{posts.map((post) => (
				<Post key={post.id} {...post} />
			))}
		</div>
	);
};

export default PostSection;
