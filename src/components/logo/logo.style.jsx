import styled from 'styled-components';

export const Logo = styled.img`
	width: 250px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
`;

export const LogoContainer = styled.div`
	width: 250px;
	min-height: 250px;
	display: flex;
	position: relative;
	background-color: white;
	overflow: hidden;
	border-radius: 50%;
`;

export const Heart = styled.img`
	width: 100px;
	position: absolute;
	top: 10%;
	left: 10%;
	transform: rotate(-30deg);
`;

export const LogoText = styled.h1`
	font-family: 'Kanit';
	font-size: 3rem;
	font-weight: 600;
	letter-spacing: 0.15rem;
	color: white;
`;
