import React from 'react';
import { HomeContainer, Span, SearchBtn } from '../homeFeed/homefeed.style.jsx';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style.jsx';
import { LogoContainer } from '../../components/logo/logo.style';
import { useNavigate } from 'react-router-dom';

export default function NoFeed() {
	const navigate = useNavigate();
	return (
		<>
			<HomeContainer>
				<LogoContainer />
				<Span>유저를 검색해 팔로우 해보세요!</Span>
				<SearchBtn
					onClick={() => {
						navigate('/Search');
					}}
				>
					검색하기
				</SearchBtn>
			</HomeContainer>
		</>
	);
}
