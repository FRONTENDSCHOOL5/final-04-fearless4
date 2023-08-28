import styled from 'styled-components';

export const SearchWrap = styled.div`
	width: 100%;
	height: calc(100vh - 50px - 50px);
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	padding-bottom: 50px;
	background-color: #fff;
	box-sizing: border-box;
`;

export const SearchInput = styled.input`
	font-family: 'Suit-Regular';
	width: 100%;
	padding: 10px 20px;
	height: 15px;
	margin-left: 20px;
	display: flex;
	background: #f2f2f2;
	border-radius: 32px;
	justify-content: center;
	align-items: center;
	border: none;
	outline: none;
	font-size: 18px;
`;

export const Wrapper = styled.article`
	width: 100%;
	box-sizing: border-box;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const NoData = styled.div`
	font-family: 'Suit-Bold';
	width: 100%;
	box-sizing: border-box;
	padding: 30px 0px 13px;
	display: flex;
	justify-content: center;
	color: #000;
	font-size: 19px;
`;

export const NoData2 = styled.p`
	font-family: 'Suit-Regular';
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	color: #777;
`;

export const MoreBtn = styled.div`
	font-family: 'Suit-Bold';
	font-size: 13px;
	cursor: pointer;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #6b7d8c;
	padding-bottom: 20px;
`;

export const SearchTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;
