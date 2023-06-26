import { SocialLoginButton } from '../../components/button/button.style';
import {
	LoginJoin,
	FlexWrapper,
} from '../../components/loginJoin/loginJoin.style.jsx';
import { Heart, Logo, LogoWrapper } from '../../components/logo/logo.style';
import { Wrapper, ButtonWrapper } from './login.style';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Splash from '../splash/Splash';
import { useRef } from 'react';
import HeartImg from '../../assets/image/heart-button.png';
import LogoImg from '../../assets/image/travelChar.png';

export default function Login() {
	const navigate = useNavigate();
	const modal = useRef(null);
	const [isLoading, setIsLoading] = useState(true);

	const token = localStorage.getItem('token');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
			if (token && isLoading) {
				navigate('/Homefeed');
			}
		}, 2800);
	}, []);

	const handleModal = (e) => {
		if (
			e.target.id === 'wrap' ||
			e.target.id === 'logo' ||
			e.target.id === 'heart'
		) {
			if (modal.current.classList.contains('modal-open')) {
				modal.current.classList.remove('modal-open');
			} else {
				modal.current.classList.add('modal-open');
			}
		}
	};

	const handleAlert = (e) => {
		alert('해당 기능은 구현중에 있습니다!\n로그인 및 회원가입을 해주세요!');
	};
	return (
		<>
			{!isLoading && !token === true ? (
				<Wrapper id='wrap' onClick={handleModal}>
					<LogoWrapper>
						<Heart id='heart' src={HeartImg} />
						<Logo id='logo' src={LogoImg} />
					</LogoWrapper>
					<ButtonWrapper ref={modal}>
						<SocialLoginButton
							borderColor={'#F2C94C'}
							socialImage={'kakao'}
							onClick={handleAlert}
						>
							카카오톡 계정으로 로그인
						</SocialLoginButton>
						<SocialLoginButton
							borderColor={'#767676'}
							socialImage={'google'}
							onClick={handleAlert}
						>
							구글 계정으로 로그인
						</SocialLoginButton>
						<SocialLoginButton
							borderColor={'#2D9CDB'}
							socialImage={'facebook'}
							onClick={handleAlert}
						>
							페이스북 계정으로 로그인
						</SocialLoginButton>
						<FlexWrapper>
							<LoginJoin to='/account/login'>이메일로 로그인</LoginJoin>|
							<LoginJoin to='/account/signup'>회원가입</LoginJoin>
						</FlexWrapper>
					</ButtonWrapper>
				</Wrapper>
			) : (
				<Splash />
			)}
		</>
	);
}
