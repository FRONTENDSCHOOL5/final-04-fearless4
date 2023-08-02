import styled, { css } from 'styled-components';

export const WrapAll = styled.div`
	background: white;
	box-sizing: border-box;
	padding: 20px 20px 20px 20px;
`;

export const Scroll = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;

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

	::-webkit-scrollbar-track {
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
	margin-left: ${({ first }) => (first ? '1px' : '10px')};

	&:hover {
		background-color: #81d8d0;
		color: white;
	}
	${({ selected }) =>
		selected &&
		css`
			background-color: #81d8d0;
			color: #fff;
		`}
`;

export const ProductsContainer = styled.ul`
	display: flex;
	gap: 10px;
	height: 100%;
	padding-bottom: 20px;
	margin-bottom: -20px;
`;

export const ProductList = styled.li`
	width: 140px;
	flex-shrink: 0;
	list-style: none;
	padding-bottom: 10px;
	&.cursor {
		cursor: pointer;
	}
`;

export const ProductImg = styled.img`
	width: 140px;
	height: 90px;
	border-radius: 8px;
	border: 0.5px solid #dbdbdb;
	object-fit: cover;
	&.hover {
		:hover {
			border: 3px solid #81d8d0;
			box-sizing: border-box;
		}
	}
`;

export const ProductName = styled.h3`
	font-weight: 400;
	font-size: 14px;
	margin-top: 6px;
	margin-bottom: 4px;
	line-height: 17.53px;
	white-space: nowrap;
`;

export const ProductPrice = styled.span`
	font-family: 'Suit-Regular';
	display: block;
	color: #81d8d0;
	font-size: 12px;
	font-weight: 700;
	line-height: 15.02px;
`;

export const ProductCardWrap = styled.div`
	width: 250px;
	height: 250px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 5px;
`;
