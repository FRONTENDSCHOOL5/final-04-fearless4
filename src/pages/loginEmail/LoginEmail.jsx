import React from 'react';
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

export default function LoginEmail() {
	return (
		<>
			<WrapperLoginEmail>
				<Title>로그인</Title>
				<WrapForm>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-email'>이메일</LabelStyle>
						<InputStyle id='user-email' type='email' required />
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-pw'>비밀번호</LabelStyle>
						<InputStyle id='user-pw' type='password' required />
						<Incorrect>*이메일 또는 비밀번호가 일치하지 않습니다.</Incorrect>
						<LoginButton>로그인</LoginButton>
					</WrapEmailPw>
				</WrapForm>
				<SignUpContainer>이메일로 회원가입</SignUpContainer>
			</WrapperLoginEmail>
		</>
	);
}
