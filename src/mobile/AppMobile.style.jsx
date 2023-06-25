import styled from 'styled-components';

export const MoblieWrap = styled.div`
	display: flex;
	justify-content: center;
	background-color: #f5f5f5;
`;

export const MoblieWidth = styled.div`
	width: 390px;
	height: 100vh;
	position: relative;

	box-shadow: 0 0 10px #e2e2e2;

	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const MobileColor = styled.div`
	background-color: #fff;
`;
