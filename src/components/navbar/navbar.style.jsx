import styled from 'styled-components';
import arrowIcon from '../../assets/icon/arrow-left.svg';
import optionIcon from '../../assets/icon/option.svg';

export const NavbarWrap = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: ${({ profile }) =>
		profile === true ? `space-between` : `initial`};
	/* width: 100%; */
	padding: 12px;
	box-sizing: border-box;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	border-bottom: solid 1px #dbdbdb;
`;

export const Backspace = styled.button`
	width: 22px;
	height: 22px;
	border: none;
	cursor: pointer;
	background: url(${arrowIcon}) no-repeat center;
`;

export const OptionModalTab = styled.button`
	width: 24px;
	height: 24px;
	border: none;
	cursor: pointer;
	background: url(${optionIcon}) no-repeat center;
`;

export const NavTitle = styled.span`
	font-size: 14px;
	font-weight: 400;
`;
