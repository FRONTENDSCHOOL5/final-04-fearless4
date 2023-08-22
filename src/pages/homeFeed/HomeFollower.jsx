import React from 'react';
import { Post } from '../../components/post/Post';
import styled from 'styled-components';

export const FeedListWrapper = styled.article`
	width: 100%;
	background-color: #fff;
	box-sizing: border-box;
`;

export default function HomeFollower({ postId }) {
	return (
		<>
			<FeedListWrapper>
				<Post postId={postId} />
			</FeedListWrapper>
		</>
	);
}
