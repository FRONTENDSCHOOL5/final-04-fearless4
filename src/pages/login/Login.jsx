import { SocialLoginButton } from '../../components/button/button.style';
import {
	LoginJoin,
	FlexWrapper,
} from '../../components/loginJoin/loginJoin.style.jsx';
import { LogoContainer } from '../../components/logo/logo.style';
import { Background } from '../../components/background/background.style.jsx';
import { Wrapper, ButtonWrapper } from './login.style';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Splash from '../splash/Splash';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2800);

		const token = localStorage.getItem('token');

		if (token) {
			navigate('/Homefeed');
		}
	}, [isLoading]);
	return (
		<>
			{isLoading === true ? (
				<Splash />
			) : (
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
							<SocialLoginButton
								borderColor={'#2D9CDB'}
								socialImage={'facebook'}
							>
								페이스북 계정으로 로그인
							</SocialLoginButton>
							<FlexWrapper>
								<LoginJoin to='/loginemail'>이메일로 로그인</LoginJoin>|
								<LoginJoin to='/signup'>회원가입</LoginJoin>
							</FlexWrapper>
						</ButtonWrapper>
					</Wrapper>
				</Background>
			)}
		</>
	);
}
