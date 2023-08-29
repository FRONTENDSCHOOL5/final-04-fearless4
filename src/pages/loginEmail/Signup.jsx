import React, { useState, useEffect, useRef } from 'react';
import {
	WrapForm,
	WrapEmailPw,
	LabelStyle,
	InputStyle,
	Incorrect,
	Title,
	Correct,
} from '../../components/form/form.style.jsx';
import { WrapperLoginEmail } from './loginEmail.style.jsx';
import { LoginButton } from '../../components/button/button.style.jsx';
import { exptext } from '../../api.js';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { postSignup } from '../../api/signupApi.js';
import { useMutation } from '@tanstack/react-query';

export default function Signup() {
	const valid = exptext;
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const emailAlertMsg = useRef(null);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const pwAlertMsg = useRef(null);
	const userEmail = useRef();

	useEffect(() => {
		userEmail.current.focus();
	}, []);

	const onChange = (event) => {
		if (event.target.type === 'email') {
			setEmail(event.target.value);
		} else if (event.target.type === 'password') {
			setPassword(event.target.value);
		}
	};

	const checkValidEmail = () => {
		if (email.length >= 1) {
			if (valid.test(email)) {
				SignupMutation.mutate({ user: { email: email } });
			} else {
				emailAlertMsg.current.textContent = '*잘못된 이메일 형식입니다.';
				emailAlertMsg.current.style.display = 'block';
				setValidEmail(false);
			}
		}
	};

	const SignupMutation = useMutation(postSignup, {
		onSuccess(data) {
			if (data.message === '사용 가능한 이메일 입니다.') {
				emailAlertMsg.current.textContent = '*' + data.message;
				emailAlertMsg.current.style.display = 'block';
				setValidEmail(true);
			} else if (data.message === '이미 가입된 이메일 주소 입니다.') {
				emailAlertMsg.current.textContent = '*' + data.message;
				emailAlertMsg.current.style.display = 'block';
				setValidEmail(false);
			}
		},
		onError(error) {
			console.log(error);
		},
	});

	const checkValidPw = () => {
		if (!(password.length >= 6)) {
			setValidPassword(false);
			setPassword(pwAlertMsg.current.value);
		} else {
			setValidPassword(true);
		}
	};
	useEffect(() => {
		checkValidEmail();
		checkValidPw();
	}, [email, password]);

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

						{validEmail ? (
							<Correct ref={emailAlertMsg}></Correct>
						) : (
							<Incorrect ref={emailAlertMsg}></Incorrect>
						)}
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='userpw'>비밀번호</LabelStyle>
						<InputStyle
							id='userpw'
							type='password'
							value={password}
							ref={pwAlertMsg}
							onChange={onChange}
							placeholder='비밀번호를 설정해 주세요.'
						/>
						{password.length > 0 && !validPassword && (
							<Incorrect>*비밀번호는 6자 이상이어야 합니다.</Incorrect>
						)}

						<LoginButton
							type='button'
							disabled={!(validEmail && validPassword)}
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
