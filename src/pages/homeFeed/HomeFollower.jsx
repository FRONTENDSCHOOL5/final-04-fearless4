import React from 'react';
import PostFeed from './Post';
import styled from 'styled-components';

export default function HomeFollower({ data }) {
	return (
		<>
			<PostFeed data={data} />
		</> //Post.jsx로 data 전달
	);
}
