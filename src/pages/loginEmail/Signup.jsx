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
import { API_URL, exptext } from '../../api.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
	const url = API_URL;
	const valid = exptext;
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const emailAlertMsg = useRef(null);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const pwAlertMsg = useRef(null);

	const userEmail = useRef();

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		userEmail.current.focus();
	}, []);

	useEffect(() => {
		const result = valid.test(email);
		console.log(result);
		console.log(userEmail);
		setValidEmail(result);
	}, [email]);

	const validPw = () => {
		setPassword(pwAlertMsg.current.value);
	};

	useEffect(() => {
		validEmail && password.length >= 6 ? setDisabled(false) : setDisabled(true);
		if (password.length >= 1) {
			password.length >= 6 ? setValidPassword(false) : setValidPassword(true);
		}
	}, [email, password]);

	const duplicateEmail = async () => {
		if (validEmail) {
			try {
				const res = await axios({
					method: 'post',
					url: `${url}/user/emailvalid`,
					headers: {
						'Content-Type': 'application/json',
					},
					data: {
						user: {
							email: email,
						},
					},
				});
				const successRes = res.data;
				console.log(res);
				if (successRes.message === '사용 가능한 이메일 입니다.') {
					emailAlertMsg.current.textContent = '*' + successRes.message;
					setValidEmail(true);
				} else {
					emailAlertMsg.current.textContent = '*' + successRes.message;
					setValidEmail(false);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			emailAlertMsg.current.textContent = '*잘못된 이메일 형식입니다.';
			emailAlertMsg.current.style.display = 'block';
			setValidEmail(false);
		}
	};

	return (
		<>
			<WrapperLoginEmail>
				<Title>이메일로 회원가입</Title>
				<WrapForm>
					<WrapEmailPw>
						<LabelStyle htmlFor='useremail'>이메일</LabelStyle>
						<InputStyle
							id='useremail'
							type='email'
							ref={userEmail}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							onBlur={duplicateEmail}
							placeholder='이메일 주소를 입력해 주세요.'
						/>

						{duplicateEmail && <Incorrect ref={emailAlertMsg}></Incorrect>}
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='userpw'>비밀번호</LabelStyle>
						<InputStyle
							id='userpw'
							type='password'
							value={password}
							ref={pwAlertMsg}
							onChange={validPw}
							placeholder='비밀번호를 설정해 주세요.'
						/>
						{validPassword && (
							<Incorrect>*비밀번호는 6자 이상이어야 합니다.</Incorrect>
						)}

						<LoginButton
							type='button'
							disabled={disabled}
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
