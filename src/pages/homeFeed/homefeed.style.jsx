import styled from 'styled-components';
import searchIcon from '../../assets/icon/icon-search.svg';

export const HomefeedWrap = styled.section`
	height: calc(100vh - 50px - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export const NavTitle = styled.span`
	font-size: 18px;
	font-weight: bold;
	color: black;
`;
export const SearchIcon = styled.button`
	width: 22px;
	height: 22px;
	border: none;
	cursor: pointer;
	background: url(${searchIcon}) no-repeat center;
`;

export const HomeContainer = styled.div`
	position: relative;
	width: 100%;
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 0 auto;
`;

export const Span = styled.span`
	font-size: 14px;
	margin-top: -30px;
	color: #767676;
`;

export const SearchBtn = styled.button`
	font-family: 'Suit-Regular';
	width: 120px;
	height: 44px;
	font-size: 14px;
	background-color: #81d8d0;
	color: white;
	border-radius: 44px;
	border: none;
	cursor: pointer;
`;

export const HomeTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
