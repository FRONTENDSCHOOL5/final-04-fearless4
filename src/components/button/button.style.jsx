import styled from 'styled-components';
import socialImg from '../../assets/image/social_login_sprites.png';

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
