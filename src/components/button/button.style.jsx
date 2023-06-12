import styled from 'styled-components';
import socialImg from '../../assets/image/social_login_sprites.png';
import chat from '../../assets/icon/message-circle.svg';
import share from '../../assets/icon/share.svg';

export const SocialLoginButton = styled.button`
	display: block;
	width: 100%;
	margin-top: 20px;
	padding: 13px 87px;
	font-size: 14px;
	color: #767676;
	background-color: #fff;
	text-align: center;
	border-radius: 44px;
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	border: 1px solid ${(props) => props.borderColor};
	&::before {
		content: '';
		display: block;
		height: 24px;
		width: 24px;
		margin: 10px;
		position: absolute;
		top: 30%;
		left: 3%;
		transform: translateY(-50%);
		background: url(${socialImg})
			${({ socialImage }) =>
				socialImage === 'kakao'
					? `-48px -10px;`
					: socialImage === 'google'
					? `-10px -10px`
					: `-86px -10px`};
	}
`;

export const LoginButton = styled.button`
	font-size: 14px;
	background-color: #81d8d0;
	opacity: 0.3;
	display: block;
	width: 100%;
	color: white;
	height: 48px;
	border-radius: 44px;
	border: none;
	margin-top: 14px;
	cursor: pointer;
`;

export const ProfileButton = styled.button`
	font-size: 14px;
	font-weight: 500;
	background-color: ${({ follow }) => (follow === true ? `#81d8d0` : `#fff`)};
	display: block;
	width: ${({ product }) => (product === true ? `100px` : `120px`)};
	padding: 8px 0;
	color: ${({ follow }) => (follow === true ? `#fff` : `#767676`)};
	border-radius: 30px;
	border: ${({ follow }) => (follow === true ? `none` : `solid 1px #DBDBDB`)};
	cursor: pointer;
`;

export const ChatShare = styled.button`
	width: 34px;
	height: 34px;
	padding: 7px;
	border-radius: 50%;
	box-sizing: border-box;
	border: solid 1px #dbdbdb;
	cursor: pointer;
	background: url(${({ chatting }) => (chatting === true ? chat : share)})
		no-repeat center;
`;
