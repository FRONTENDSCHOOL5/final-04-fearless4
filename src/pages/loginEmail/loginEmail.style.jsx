import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const WrapperLoginEmail = styled.section`
	width: 100%;
	gap: 20px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: 34px 34px 0px;
	box-sizing: border-box;
`;

export const SignUpContainer = styled(Link)`
	display: block;
	text-align: center;
	color: #767676;
	font-size: 12px;
	&:hover {
		cursor: pointer;
	}
`;
