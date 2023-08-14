import styled from 'styled-components';

export const ProductCardImg = styled.img`
	width: 100%;
	height: 60%;
	border-radius: 5px 5px 0px 0px;
`;

export const ProductCardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 6px;
`;

export const ProductCardClose = styled.div`
	margin-top: 15px;
	margin-left: 10px;
	font-size: 12px;
	font-weight: bold;
`;

export const CloseIconImg = styled.img`
	width: 6px;
	margin-top: 1.5px;
	cursor: pointer;
`;

export const CloseIconText = styled.span`
	margin-left: 4px;
	cursor: pointer;
`;
