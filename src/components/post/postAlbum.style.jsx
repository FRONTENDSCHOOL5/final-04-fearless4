import styled from 'styled-components';

export const GridItem = styled.div`
	width: 114px;
	height: 114px;
	object-fit: cover;
	cursor: pointer;
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-position: center center;
`;

export const GridView = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(114px, 114px));
	grid-gap: 8px;
	margin: 0 auto;
	padding: 16px 16px;
	box-sizing: border-box;
`;
