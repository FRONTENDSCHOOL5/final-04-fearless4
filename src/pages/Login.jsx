import React from 'react';
import styled from 'styled-components';
import Splash from './Splash.jsx';
import { SocialLoginButton } from '../components/button/SocialLoginButton.style.jsx';
import { LoginJoin } from '../components/loginJoin/LoginJoin.style.jsx';
import { LoginList } from '../components/button/LoginList.style.jsx';
import LogoContainer from '../components/logo/LogoContainer.jsx';
import { Background } from '../components/background/background.style.jsx';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 0 auto;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	padding: 50px 34px 85px 34px;
	background-color: #ffff;
	border-radius: 20px 20px 0 0;
	position: fixed;
	bottom: 0;
`;

const WrapperLogin = styled.div`
	width: 100%;
	position: relative;
`;

export default function Login() {
	return (
		<>
			<Background>
				<Wrapper>
					<LogoContainer />
					<ButtonWrapper>
						<SocialLoginButton borderColor={'#F2C94C'} socialImage={'kakao'}>
							카카오톡 계정으로 로그인
						</SocialLoginButton>
						<SocialLoginButton borderColor={'#767676'} socialImage={'google'}>
							구글 계정으로 로그인
						</SocialLoginButton>
						<SocialLoginButton borderColor={'#2D9CDB'} socialImage={'facebook'}>
							페이스북 계정으로 로그인
						</SocialLoginButton>
						<LoginJoin>이메일로 로그인 | 회원가입</LoginJoin>
					</ButtonWrapper>
				</Wrapper>
			</Background>
		</>
	);
}
