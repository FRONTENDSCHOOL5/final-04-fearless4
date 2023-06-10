import React from 'react';
import styled from 'styled-components';
import {
	Title,
	WrapForm,
	InputStyle,
	Incorrect,
} from '../../components/form/form.style.jsx';
import { LoginButton } from '../../components/button/button.style.jsx';
import {
	WrapperProfileSetup,
	ProfileText,
	DescriptionText,
	Upload,
	ProfileImage,
	ImageButton,
	Name,
	ID,
	Intro,
	LabelStyle,
} from './profileSetup.style.jsx';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';

const ProfileSetup = () => {
	return (
		<WrapperProfileSetup>
			<Title mb>프로필 설정</Title>
			<DescriptionText>나중에 언제든지 변경할 수 있습니다.</DescriptionText>

			<Upload>
				<ProfileImage src={profilePic} alt='' />
				<ImageButton src={profileImageUploadButton} alt='' />
			</Upload>

			<WrapForm>
				<Name>
					<LabelStyle htmlFor='user-name'>사용자 이름</LabelStyle>
					<InputStyle
						type='text'
						name=''
						placeholder='2~10자 이내여야 합니다.'
					/>
				</Name>

				<ID>
					<LabelStyle htmlFor='user-id'>계정 ID</LabelStyle>
					<InputStyle
						type='text'
						name=''
						placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
					/>
					<Incorrect>
						*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
					</Incorrect>
				</ID>

				<Intro>
					<LabelStyle htmlFor='user-intro'>소개</LabelStyle>
					<InputStyle
						type='text'
						name=''
						placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
					/>
				</Intro>

				<LoginButton type='submit'>트래블어스 시작하기</LoginButton>
			</WrapForm>
		</WrapperProfileSetup>
	);
};

export default ProfileSetup;
