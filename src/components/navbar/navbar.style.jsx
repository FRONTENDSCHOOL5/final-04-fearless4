import styled from 'styled-components';
import arrowIcon from '../../assets/icon/arrow-left.svg';
import optionIcon from '../../assets/icon/option.svg';
import Cat from '../../assets/image/cat.png';
import { Link } from 'react-router-dom';

export const NavbarWrap = styled.header`
	position: relative;
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: ${({ spaceBetween }) =>
		spaceBetween === true ? `space-between` : `initial`};
	padding: 12px;
	box-sizing: border-box;
	top: 0;
	background-color: #fff;
	border-bottom: solid 1px #dbdbdb;
	z-index: 1;
`;

export const Backspace = styled(Link)`
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

export const NavbarTitle = styled.span`
	font-size: 14px;
	font-weight: 400;
	margin-left: 8px;
`;

export const TitleLogoWrap = styled.div`
	font-weight: bold;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const TitleImg = styled.img`
	width: 42px;
	margin-right: -8px;
	margin-left: ${({ ml }) => (ml === true ? '-15px' : 'initial')};
`;

export const TitleColorMint = styled.h2`
	color: #81d8d0;
`;

export const TitleColorGray = styled.h2`
	color: #767676;
`;

export function TitleLogo() {
	return (
		<TitleLogoWrap>
			<TitleImg src={Cat} alt='TravelUs 로고' ml />
			<TitleColorMint>T</TitleColorMint>
			<TitleColorGray>ravel</TitleColorGray>
			<TitleColorMint>Us</TitleColorMint>
		</TitleLogoWrap>
	);
}
