import React from 'react';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import {
	SearchBtn,
	Span,
	HomeContainer,
	Nav,
	NavTitle,
} from '../homeFeed/homefeed.style.jsx';
import { LogoContainer } from '../../components/logo/logo.style';
import searchIcon from '../../assets/icon/icon-search.svg';

export default function Homefeed() {
	return (
		<>
			<Nav>
				<NavTitle>감귤마켓 피드</NavTitle>
				<img class='search-icon' src={searchIcon} alt='검색 아이콘' />
			</Nav>
			<HomeContainer>
				<LogoContainer />
				<Span>유저를 검색해 팔로우 해보세요!</Span>
				<SearchBtn>검색하기</SearchBtn>
				<BottomNavContainer />
			</HomeContainer>
		</>
	);
}
