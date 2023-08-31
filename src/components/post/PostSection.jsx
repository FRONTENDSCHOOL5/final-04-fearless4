import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PostDeleteContext } from '../../pages/post/PostDeleteContext';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../components/post/Post';
import { GridView, GridItem } from './postAlbum.style';
import { getUserPosts } from '../../api/postAPI';

const PostSection = ({ accountname, listView }) => {
	const { deletedPostId } = useContext(PostDeleteContext);
	const navigate = useNavigate();

	const {
		data: posts,
		isLoading,
		isError,
		error,
	} = useQuery(['userPosts', accountname], () => getUserPosts(accountname), {
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : listView ? (
				posts &&
				posts.post.map((post, index) => <Post key={index} postId={post.id} />)
			) : (
				<GridView>
					{posts &&
						posts.post
							.filter((post) => post.image !== '')
							.map((post, index) => (
								<GridItem
									key={index}
									image={post.image}
									onClick={() => navigate(`/post/view/${post.id}`)}
								/>
							))}
				</GridView>
			)}
		</div>
	);
};

export default PostSection;
