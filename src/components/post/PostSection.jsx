import React, { useState, useEffect, useContext } from 'react';
import { PostDeleteContext } from '../../pages/post/PostDeleteContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Post } from './post.style';
import { GridView, GridItem } from './postAlbum.style';
import { API_URL } from '../../api';

const PostSection = ({ accountname, listView }) => {
	const { deletedPostId } = useContext(PostDeleteContext);
	const [posts, setPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (accountname) {
			console.log('accountname: ', accountname);
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
			setIsLoading(true);
			getPostList();
		}
	}, [accountname, token, deletedPostId]);

	return (
		<div>
			{isLoading &&
				(listView ? (
					posts &&
					posts.map((post, index) => <Post key={index} postId={post.id} />)
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
				))}
		</div>
	);
};

export default PostSection;
