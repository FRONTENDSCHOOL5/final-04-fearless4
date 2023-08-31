import React, { useState, useEffect, useRef } from 'react';
import {
	WrapForm,
	WrapEmailPw,
	LabelStyle,
	InputStyle,
	Incorrect,
	Title,
} from '../../components/form/form.style.jsx';
import { WrapperLoginEmail } from './loginEmail.style.jsx';
import { LoginButton } from '../../components/button/button.style.jsx';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { postSignup } from '../../api/signupApi.js';
import { useMutation } from '@tanstack/react-query';

export default function Signup() {
	const navigate = useNavigate();
	const userEmail = useRef();
	const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(true);
	const [debounceValue, setDebounceValue] = useState(email);

	useEffect(() => {
		userEmail.current.focus();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(email);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [email]);

	const onChange = (event) => {
		if (event.target.type === 'email') {
			setEmail(event.target.value);
		} else if (event.target.type === 'password') {
			setPassword(event.target.value);
		}
	};

	const checkValidEmail = () => {
		if (email.length >= 1) {
			if (exptext.test(email)) {
				SignupMutation.mutate({ user: { email: email } });
			} else {
				setValidEmail('validEmail');
			}
		}
	};

	const SignupMutation = useMutation(postSignup, {
		onSuccess(data) {
			if (data.message === '사용 가능한 이메일 입니다.') {
				setValidEmail(false);
			} else if (data.message === '이미 가입된 이메일 주소 입니다.') {
				setValidEmail('checkEmail');
			}
		},
		onError(error) {
			console.log(error);
		},
	});

	const checkValidPw = () => {
		if (!(password.length >= 6)) {
			setValidPassword(false);
		} else {
			setValidPassword(true);
		}
	};

	useEffect(() => {
		checkValidEmail();
		checkValidPw();
	}, [debounceValue, password]);

	return (
		<>
			<Helmet>
				<title>TravelUs | 회원가입</title>
			</Helmet>
			<WrapperLoginEmail>
				<Title>이메일로 회원가입</Title>
				<WrapForm>
					<WrapEmailPw>
						<LabelStyle htmlFor='useremail'>이메일</LabelStyle>
						<InputStyle
							id='useremail'
							type='email'
							ref={userEmail}
							onChange={onChange}
							value={email}
							placeholder='이메일 주소를 입력해 주세요.'
						/>

						{validEmail === 'checkEmail' && (
							<Incorrect>이미 가입된 이메일 주소 입니다.</Incorrect>
						)}
						{validEmail === 'validEmail' && (
							<Incorrect>* 잘못된 이메일 형식입니다.</Incorrect>
						)}
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='userpw'>비밀번호</LabelStyle>
						<InputStyle
							id='userpw'
							type='password'
							value={password}
							onChange={onChange}
							placeholder='비밀번호를 설정해 주세요.'
						/>
						{password.length > 0 && !validPassword && (
							<Incorrect>*비밀번호는 6자 이상이어야 합니다.</Incorrect>
						)}

						<LoginButton
							type='button'
							disabled={!(!validEmail && validPassword)}
							onClick={() => {
								navigate('./profileSetup', {
									state: { email: email, password: password },
								});
							}}
						>
							다음
						</LoginButton>
					</WrapEmailPw>
				</WrapForm>
			</WrapperLoginEmail>
		</>
	);
}
