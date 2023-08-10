import styled from 'styled-components';
import uparrowIcon from '../../assets/icon/uparrow.svg';

export const Topbutton = styled.button`
	position: fixed;
	bottom: 8%;
	margin-left: 330px;
	padding: 18px;
	background-color: #81d8d0;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	z-index: 1;

	box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);

	&:hover {
		background-color: #a9f0e9;
	}
	background-image: url(${uparrowIcon});
	background-repeat: no-repeat;
	background-size: cover;
`;
