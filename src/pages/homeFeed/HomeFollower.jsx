import React from 'react';
import PostFeed from './Post';
import styled from 'styled-components';

const Container = styled.div`
	margin: 40px 30px 0;
`;
export default function HomeFollower({ data }) {
	return (
		<>
			<Container>
				<PostFeed data={data} />
			</Container>
		</> //Post.jsx로 data 전달
	);
}
