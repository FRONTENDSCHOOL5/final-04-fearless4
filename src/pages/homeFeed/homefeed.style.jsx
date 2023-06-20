import styled from 'styled-components';
import searchIcon from '../../assets/icon/icon-search.svg';

export const Nav = styled.nav`
	display: flex;
	padding: 8px 16px 8px 20.58px;
	border-bottom: solid 1px #dbdbdb;
	position: fixed;
	width: 100%;
	background-color: #fff;
	align-items: center;
	z-index: 999;
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
	color: #767676;
`;

export const SearchBtn = styled.button`
	width: 120px;
	height: 44px;
	font-size: 14px;
	background-color: #81d8d0;
	color: white;
	border-radius: 44px;
	border: none;
	cursor: pointer;
`;
