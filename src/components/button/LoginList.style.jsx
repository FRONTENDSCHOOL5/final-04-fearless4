import styled from 'styled-components';
import loginSpriteImg from '../../assets/image/social_login_sprites.png';

export const LoginList = styled.ul`
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0 34px;
	background-color: white;
	border-radius: 20px 20px 0 0;

	& li & a {
		width: 100%;
		font-size: 1.4rem;
		display: block;
		padding: 13px 87px;
		text-decoration: none;
		color: #767676;
		text-align: center;
		margin-top: 20px;
		border-radius: 44px;
		box-sizing: border-box;
		position: relative;
	}
`;
