import React from 'react';
import { Post } from '../../components/post/Post';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import styled from 'styled-components';

export const FeedListWrapper = styled.div`
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
