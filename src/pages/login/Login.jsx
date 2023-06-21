import { SocialLoginButton } from '../../components/button/button.style';
import {
	LoginJoin,
	FlexWrapper,
} from '../../components/loginJoin/loginJoin.style.jsx';
import { Heart, Logo, LogoWrapper } from '../../components/logo/logo.style';
import { Background } from '../../components/background/background.style.jsx';
import { Wrapper, ButtonWrapper } from './login.style';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useRef } from 'react';

import LogoImg from '../../assets/image/travelchar_crop.png';
import HeartImg from '../../assets/image/heart-button.png';

export default function Login() {
	const navigate = useNavigate();
	const modal = useRef(null);

	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			navigate('/Homefeed');
		}
		// else {
		// 	setTimeout(function () {
		// 		modal.current.classList.add('modal-open');
		// 	}, 5000);
		// }
	}, []);

	const handleModal = (e) => {
		if (e.target.id === 'wrap' || e.target.id === 'logo') {
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
			<Background>
				<Wrapper id='wrap' onClick={handleModal}>
					<LogoWrapper>
						<Heart src={HeartImg} />
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
							<LoginJoin to='/loginemail'>이메일로 로그인</LoginJoin>|
							<LoginJoin to='/signup'>회원가입</LoginJoin>
						</FlexWrapper>
					</ButtonWrapper>
				</Wrapper>
			</Background>
		</>
	);
}
