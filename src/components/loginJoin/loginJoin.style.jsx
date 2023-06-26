import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginJoin = styled(Link)`
	display: block;
	text-align: center;
	font-size: 14px;
	color: #767676;
	cursor: pointer;
`;

export const FlexWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 12px;
	padding: 20px 10px 10px 10px;
	color: #767676;
`;
