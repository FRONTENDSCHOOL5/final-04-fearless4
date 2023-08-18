import React, { useState, useEffect } from 'react';
import {
	WrapForm,
	WrapEmailPw,
	LabelStyle,
	InputStyle,
	Incorrect,
	Title,
} from '../../components/form/form.style.jsx';
import { WrapperLoginEmail, SignUpContainer } from './loginEmail.style.jsx';
import { LoginButton } from '../../components/button/button.style.jsx';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../../api/loginApi.js';

export default function LoginEmail() {
	const [emailValid, setEmailValid] = useState(false);
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [correct, setCorrect] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const navigate = useNavigate();
	const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

	useEffect(() => {
		setDisabled(!(emailValid && pw.length >= 6));
	}, [emailValid, pw]);

	function validation(e) {
		const emailValue = e.target.value;
		const pwValue = e.target.value;
		if (e.target.id === 'user-email') {
			setEmail(emailValue);
			setEmailValid(emailPattern.test(emailValue));
		}
		if (e.target.id === 'user-pw') {
			setPw(pwValue);
		}
	}

	const postLoginMutation = useMutation(postLogin, {
		onSuccess: (data) => {
			if (data.user) {
				localStorage.setItem('token', data.user['token']);
				localStorage.setItem('userAccountName', data.user['accountname']);
				navigate('/Homefeed');
			} else if (data.message) {
				setCorrect(true);
			}
		},
		onError: () => {
			console.error('실패');
		},
	});

	async function userLogin(e) {
		e.preventDefault();
		const data = {
			user: {
				email: email,
				password: pw,
			},
		};
		postLoginMutation.mutate(data);
	}

	return (
		<>
			<Helmet>
				<title>TravelUs | 로그인</title>
			</Helmet>
			<WrapperLoginEmail onSubmit={userLogin}>
				<Title>로그인</Title>
				<WrapForm>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-email'>이메일</LabelStyle>
						<InputStyle
							id='user-email'
							type='email'
							value={email}
							onChange={validation}
							required
						/>
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-pw'>비밀번호</LabelStyle>
						<InputStyle
							id='user-pw'
							type='password'
							value={pw}
							onChange={validation}
							required
						/>
						{correct && (
							<Incorrect>*이메일 또는 비밀번호가 일치하지 않습니다.</Incorrect>
						)}
						<LoginButton disabled={disabled}>로그인</LoginButton>
					</WrapEmailPw>
				</WrapForm>
				<SignUpContainer to={'/account/signup'}>
					이메일로 회원가입
				</SignUpContainer>
			</WrapperLoginEmail>
		</>
	);
}
