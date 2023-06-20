import React from 'react';
import PostFeed from './Post';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';

export default function HomeFollower({ data }) {
	return (
		<>
			<PostFeed data={data} />
			<BottomNavContainer />
		</> //Post.jsx로 data 전달
	);
}
