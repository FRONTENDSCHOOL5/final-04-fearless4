import React from 'react';
import styled from 'styled-components';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';

const Container = styled.div`
	width: 100%;
	justify-content: center;
	box-sizing: border-box;
	padding: 54px 34px 0px 34px;
`;

const ProfileText = styled.h1`
	display: block;
	text-align: center;
	font-size: 24px;
	margin-bottom: 16px;
	font-weight: 700;
`;

const DescriptionText = styled.p`
	display: block;
	text-align: center;
	font-size: 14px;
	color: #767676;
	margin-bottom: 30px;
`;

const Upload = styled.div`
	width: 110px;
	height: 110px;
	margin: 0 auto;
	padding: 0;
	display: flex;
	justify-content: center;
	position: relative;
`;

const ProfileImage = styled.img`
	width: 100%;
	cursor: pointer;
`;

const ImageButton = styled.img`
	width: 36px;
	position: absolute;
	bottom: 0;
	right: 0;
`;

const InputWrap = styled.div`
	display: flex;
	margin-top: 30px;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
`;

const Name = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const ID = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	span {
		font-size: 12px;
		color: #eb5757;
	}
`;

const Intro = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const LabelStyle = styled.label`
	color: #767676;
	font-size: 12px;
`;

const InputStyle = styled.input`
	border: none;
	border-bottom: 1px solid #dbdbdb;
	font-size: 14px;

	&::placeholder {
		color: #dbdbdb;
	}

	&:focus {
		outline: none;
		border-color: #81d8d0;
	}
`;

const StartButton = styled.button`
	width: 100%;
	height: 48px;
	font-size: 14px;
	background-color: #81d8d0;
	color: white;
	opacity: 0.3;
	display: block;
	border-radius: 44px;
	border: none;
`;

const ProfileSetup = () => {
	return (
		<Container>
			<ProfileText>프로필 설정</ProfileText>
			<DescriptionText>나중에 언제든지 변경할 수 있습니다.</DescriptionText>

			<Upload>
				<ProfileImage src={profilePic} alt='' />
				<ImageButton src={profileImageUploadButton} alt='' />
			</Upload>

			<InputWrap>
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
					<span>*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</span>
				</ID>

				<Intro>
					<LabelStyle htmlFor='user-intro'>소개</LabelStyle>
					<InputStyle
						type='text'
						name=''
						placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
					/>
				</Intro>

				<StartButton type='submit'>트래블어스 시작하기</StartButton>
			</InputWrap>
		</Container>
	);
};

export default ProfileSetup;
