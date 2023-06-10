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
				<Title>이메일로 회원가입</Title>
				<WrapForm>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-email'>이메일</LabelStyle>
						<InputStyle
							id='user-email'
							type='email'
							required
							placeholder='이메일 주소를 입력해 주세요.'
						/>
					</WrapEmailPw>
					<WrapEmailPw>
						<LabelStyle htmlFor='user-pw'>비밀번호</LabelStyle>
						<InputStyle
							id='user-pw'
							type='password'
							required
							placeholder='비밀번호를 설정해 주세요.'
						/>
						<Incorrect>*이메일 또는 비밀번호가 일치하지 않습니다.</Incorrect>
						<LoginButton>다음</LoginButton>
					</WrapEmailPw>
				</WrapForm>
			</WrapperLoginEmail>
		</>
	);
}
