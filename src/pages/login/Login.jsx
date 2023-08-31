import { SocialLoginButton } from '../../components/button/button.style';
import {
	LoginJoin,
	FlexWrapper,
} from '../../components/loginJoin/loginJoin.style.jsx';
import {
	CatTailImg,
	Heart,
	LoginCat,
	LogoWrapper,
} from '../../components/logo/logo.style';
import { Wrapper, ButtonWrapper, TravelUsSpan } from './login.style';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Splash from '../splash/Splash';
import { useRef } from 'react';
import HeartImg from '../../assets/image/heart-button.png';
import LogoImg from '../../assets/image/travelChar_notail.png';
import {
	ToastClose,
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { Helmet } from 'react-helmet-async';
import CatTail from '../../assets/image/tail.png';

export default function Login() {
	const navigate = useNavigate();
	const modal = useRef(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showNotAvailable, setShowNotAvailable] = useState(false);

	const token = localStorage.getItem('token');
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
			if (token && isLoading) {
				navigate('/Homefeed');
			}
		}, 2600);
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
		setShowNotAvailable(true);
		setTimeout(() => setShowNotAvailable(false), 3000);
	};

	const NotAvailable = () => (
		<>
			{showNotAvailable && (
				<ToastContainer>
					<ToastMsg>
						<ToastMsgBold>현재</ToastMsgBold> 지원하지 않는 기능입니다! <br />{' '}
						이메일로 로그인 또는 회원가입을 진행해 주세요.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	return (
		<>
			{!isLoading && !token === true ? (
				<>
					<Helmet>
						<title>TravelUs | 소셜 로그인</title>
					</Helmet>
					<Wrapper id='wrap' onClick={handleModal}>
						<LogoWrapper>
							<Heart id='heart' src={HeartImg} />
							<LoginCat id='logo' src={LogoImg} />
							<CatTailImg src={CatTail} />
							<TravelUsSpan>TravelUs</TravelUsSpan>
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
						<NotAvailable />
					</Wrapper>
				</>
			) : (
				<Splash />
			)}
		</>
	);
}
