import React from 'react';
import { Post } from '../../components/post/post.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import styled from 'styled-components';

export const FeedListWrapper = styled.div`
	width: 100%;
	background-color: #fff;
	padding: 50px 0px 50px 0px;
	box-sizing: border-box;
`;

export default function HomeFollower({ postId }) {
	return (
		<>
			<FeedListWrapper>
				<Post postId={postId} />
			</FeedListWrapper>
			<BottomNavContainer />
		</>
	);
}
