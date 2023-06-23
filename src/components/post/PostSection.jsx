import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Post } from './post.style';
import { GridView, GridItem } from './postAlbum.style';
import { API_URL } from '../../api';

const PostSection = ({ accountname, listView, handlePostModalOptionClick }) => {
	const [posts, setPosts] = useState(null);
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

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

	console.log(posts);

	return (
		<div>
			{listView ? (
				posts &&
				posts.map((post, index) => (
					<Post
						key={index}
						postId={post.id}
						myProfileImg={post.author.image}
						username={post.author.username}
						accountname={post.author.accountname}
						content={post.content}
						image={post.image}
						heartCount={post.heartCount}
						commentCount={post.commentCount}
						createdAt={post.createdAt}
						handlePostModalOptionClick={handlePostModalOptionClick}
					/>
				))
			) : (
				<GridView>
					{posts &&
						posts
							.filter((post) => post.image !== '')
							.map((post, index) => (
								<GridItem
									key={index}
									image={post.image}
									onClick={() => navigate(`/viewPost/${post.id}`)}
								/>
							))}
				</GridView>
			)}
		</div>
	);
};

export default PostSection;
