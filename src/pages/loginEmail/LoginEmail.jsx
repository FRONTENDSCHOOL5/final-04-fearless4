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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

	async function userLogin(e) {
		e.preventDefault();
		const url = 'https://api.mandarin.weniv.co.kr';
		try {
			const res = await axios({
				method: 'post',
				url: `${url}/user/login`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					user: {
						email: email,
						password: pw,
					},
				},
			});
			const successRes = res.data;
			if (successRes.user) {
				// 요청이 성공하고, user 속성이 존재하는 경우 localStorage에 'token'이라는 키로 저장한다.
				const token = successRes.user['token'];
				localStorage.setItem('token', token);
				const userAccountName = successRes.user['accountname'];
				localStorage.setItem('userAccountName', userAccountName);
				navigate('/Homefeed');
			} else if (successRes.message) {
				// 요청이 성공하고, message 속성이 존재하는 경우 setCorrect(true)를 호출해서 이메일 또는 비밀번호가 일치하지 않을 때 오류 메시지를 표시한다.
				setCorrect(true);
			}
		} catch (error) {
			// 요청이 실패한 경우
			console.error(error);
		}
	}

	function GoToSignUp() {
		navigate('/account/signup');
	}

	return (
		<>
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
				<SignUpContainer onClick={GoToSignUp}>
					이메일로 회원가입
				</SignUpContainer>
			</WrapperLoginEmail>
		</>
	);
}
