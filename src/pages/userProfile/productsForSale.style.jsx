import styled from 'styled-components';

export const WrapAll = styled.div`
	background: white;
	padding: 20px 0px 20px 20px;
	border: 0.5px solid #dbdbdb;
`;

export const Scroll = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;
	height: 100%;

	::-webkit-scrollbar {
		height: 10px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #ddf0ef;
		border-radius: 10px;
		background-clip: padding-box;
		border: 1px solid transparent;
		height: 5px;
	}

	::webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 10px;
	}
`;

export const Title = styled.h2`
	font-size: 16px;
	font-weight: 700;
	margin-bottom: 16px;
	line-height: 20.03px;
`;

export const SortedButton = styled.button`
	font-family: 'Suit-Regular';
	margin-bottom: 20px;
	border: none;
	margin-left: 10px;
	border-radius: 44px;
	padding: 6px 8px 6px 7px;
	font-size: 13px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #81d8d0;
		color: white;
	}
`;

export const ProductsContainer = styled.ul`
	display: flex;
	gap: 10px;
	height: 100%;
	padding-bottom: 20px;
`;

export const ProductList = styled.li`
	width: 140px;
	height: 132px;
	flex-shrink: 0;
	list-style: none;
	padding-bottom: 10px;
	cursor: pointer;
`;

export const ProductImg = styled.img`
	width: 140px;
	height: 90px;
	border-radius: 8px;
	border: 0.5px solid #dbdbdb;
	object-fit: cover;
	:hover {
		border: 3px solid #81d8d0;
		box-sizing: border-box;
	}
`;

export const ProductName = styled.h3`
	font-weight: 400;
	font-size: 14px;
	margin-top: 6px;
	margin-bottom: 4px;
	line-height: 17.53px;
`;

export const ProductPrice = styled.span`
	font-family: 'Suit-Regular';
	display: block;
	color: #81d8d0;
	font-size: 12px;
	/* font-weight: 700; */
	line-height: 15.02px;
`;
