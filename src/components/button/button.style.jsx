import styled from 'styled-components';
import socialImg from '../../assets/image/social_login_sprites.png';
import chat from '../../assets/icon/icon-message-circle.svg';
import share from '../../assets/icon/share.svg';
import UploadImage from '../../assets/icon/upload-image.svg';

export const SocialLoginButton = styled.button`
	font-family: 'Suit-Regular';
	display: block;
	width: 100%;
	padding: 8px;
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
	&:hover {
		background-color: ${({ socialImage }) =>
			socialImage === 'kakao'
				? '#f3dfa3'
				: socialImage === 'google'
				? '#cac8c8'
				: '#69b2dd'};
		border-color: transparent;
		color: #fff;
	}
`;

export const LoginButton = styled.button`
	font-family: 'Suit-Regular';
	font-size: 14px;
	background-color: #81d8d0;
	opacity: ${({ disabled }) => (disabled === true ? 0.3 : 1)};
	display: block;
	width: 100%;
	color: white;
	height: 48px;
	border-radius: 44px;
	border: none;
	margin-top: 14px;

	cursor: ${({ disabled }) => (disabled === true ? 'not-allowed' : 'pointer')};
`;

export const ProfileButton = styled.button`
	font-family: 'Suit-Regular';
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

	&:hover {
		color: ${({ follow }) => (follow === false ? `#767676` : `#fff`)};
		background-color: ${({ follow }) =>
			follow === false ? `#DBDBDB` : `#81d8d0`};
	}
`;

export const ChatShare = styled.button`
	font-family: 'Suit-Regular';
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

export const FollowButton = styled.button`
	font-family: 'Suit-Regular';
	font-size: 12px;
	font-weight: 500;
	background-color: ${({ follow }) => (follow === false ? `#81d8d0` : `#fff`)};
	display: block;
	width: 60px;
	height: 30px;
	padding: 0 11px;
	color: ${({ follow }) => (follow === false ? `#fff` : `#767676`)};
	border-radius: 30px;
	border: ${({ follow }) => (follow === false ? `none` : `solid 1px #DBDBDB`)};
	cursor: pointer;
`;

export const SaveButton = styled.button`
	font-family: 'Suit-Regular';
	border-radius: 32px;
	color: rgba(255, 255, 255, 1);
	width: 90px;
	height: 32px;
	background-color: #81d8d0;
	border: none;
	font-size: 14px;
	opacity: ${({ disabled }) => (disabled === true ? 0.3 : 1)};
	cursor: ${({ disabled }) => (disabled === true ? 'not-allowed' : 'pointer')};
`;

export const ImageUploadButton = styled.button`
	font-family: 'Suit-Regular';
	background: url(${UploadImage});
	width: 50px;
	height: 50px;
	position: absolute;
	border: 0;
	bottom: 16px;
	right: 16px;
	cursor: pointer;
`;

export const MoreButton = styled.button`
	width: 150px;
	font-size: 16px;
	font-weight: 500;
	color: white;
	font-family: 'Suit-Regular';
	background-color: #81d8d0;
	padding: 6px;
	margin: 0 auto;
	border: none;
	border-radius: 10px;
	cursor: pointer;
`;
