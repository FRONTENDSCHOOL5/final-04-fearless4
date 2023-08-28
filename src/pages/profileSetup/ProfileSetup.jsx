import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Title,
	WrapForm,
	InputStyle,
	Incorrect,
} from '../../components/form/form.style.jsx';
import { LoginButton } from '../../components/button/button.style.jsx';
import {
	WrapperProfileSetup,
	DescriptionText,
	Upload,
	ProfileImage,
	ImageButton,
	FormElement,
	LabelStyle,
	ImageInput,
	LabelStyleImg,
} from './profileSetup.style.jsx';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { Helmet } from 'react-helmet';
import imageValidation from '../../imageValidation.js';
import { postAccountValid } from '../../api/profileApi.js';
import { useMutation } from '@tanstack/react-query';
import { postProfileSetup } from '../../api/signupApi.js';

const ProfileSetup = () => {
	const location = useLocation();
	const email = location.state.email;
	const password = location.state.password;
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [intro, setIntro] = useState('');
	const [selectedImage, setSelectedImage] = useState('');
	const [idDuplication, setIdDuplication] = useState(false);
	const [notValidUserId, setNotValidUserId] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const [showProfileEditToast, setShowProfileEditToast] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userName) {
			setDisabled(true);
		}
	}, [userName]);

	const handleImageInputChange = async (e) => {
		imageValidation(
			e,
			1,
			320,
			setSelectedImage,
			setShowSizeOverToast,
			setShowWrongExtensionToast
		);
	};

	const postValidMutation = useMutation(postAccountValid, {
		onSuccess: (data) => {
			if (data === '사용 가능한 계정ID 입니다.') {
				setIdDuplication(false);
				setDisabled(false);
			} else if (data === '이미 가입된 계정ID 입니다.') {
				setIdDuplication(true);
				setDisabled(true);
			}
		},
		onError: () => {
			console.error('실패');
		},
	});
	const validateUserId = async () => {
		if (!userId || /^[A-Za-z0-9._]+$/.test(userId)) {
			setNotValidUserId(false);
			postValidMutation.mutate(userId);
		} else {
			setNotValidUserId(true);
			setIdDuplication(false);
			setDisabled(true);
		}
	};

	const postProfileSetupMutation = useMutation(postProfileSetup, {
		onSuccess: (data) => {
			setShowProfileEditToast(true);
			setTimeout(() => {
				setShowProfileEditToast(false);
				navigate('/');
			}, 1000);
		},
		onError: () => {
			console.error('회원가입 실패');
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('image', selectedImage);

		const data = {
			user: {
				username: userName,
				email: email,
				password: password,
				accountname: userId,
				intro: intro,
				image:
					selectedImage === ''
						? 'https://api.mandarin.weniv.co.kr/1689555394412.png'
						: selectedImage,
			},
		};

		postProfileSetupMutation.mutate(data);
	};

	const ProfileSetupToast = () => (
		<>
			{showProfileEditToast && (
				<ToastContainer>
					<ToastIcon>😆</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>회원가입</ToastMsgBold>이 완료되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	const WrongExtensionToast = () => (
		<>
			{showWrongExtensionToast && (
				<ToastContainer>
					<ToastIcon>😵‍💫</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>이미지</ToastMsgBold>만 업로드 해 주세요!
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	const SizeOverToast = () => (
		<>
			{showSizeOverToast && (
				<ToastContainer>
					<ToastIcon>😵</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>10MB</ToastMsgBold>이하의 파일만 업로드 해 주세요!
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	return (
		<>
			<Helmet>
				<title>TravelUs | 회원가입</title>
			</Helmet>
			<WrapperProfileSetup>
				<Title mb>프로필 설정</Title>
				<DescriptionText>나중에 언제든지 변경할 수 있습니다.</DescriptionText>

				<WrapForm onSubmit={handleSubmit}>
					<Upload>
						<LabelStyleImg htmlFor='user-image'>사용자 이미지</LabelStyleImg>
						<ImageInput
							type='file'
							id='user-image'
							accept='image/*'
							onChange={handleImageInputChange}
						/>
						<ProfileImage src={selectedImage || profilePic} alt='' />{' '}
						<ImageButton src={profileImageUploadButton} alt='' />
					</Upload>

					<FormElement>
						<LabelStyle htmlFor='user-name'>사용자 이름</LabelStyle>
						<InputStyle
							type='text'
							id='user-name'
							name=''
							placeholder='2~10자 이내여야 합니다.'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</FormElement>

					<FormElement>
						<LabelStyle htmlFor='user-id'>계정 ID</LabelStyle>
						<InputStyle
							type='text'
							id='user-id'
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							onBlur={validateUserId}
							placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
							pattern='^[A-Za-z0-9._]+$'
						/>
						{notValidUserId && (
							<Incorrect>
								*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
							</Incorrect>
						)}
						{idDuplication && (
							<Incorrect>*이미 사용중인 계정 ID입니다.</Incorrect>
						)}
					</FormElement>

					<FormElement>
						<LabelStyle htmlFor='user-intro'>소개</LabelStyle>
						<InputStyle
							type='text'
							name=''
							placeholder='자신에 대해서 소개해 주세요!'
							value={intro}
							onChange={(e) => setIntro(e.target.value)}
						/>
					</FormElement>

					<LoginButton disabled={disabled}>트래블어스 시작하기</LoginButton>
				</WrapForm>
				<ProfileSetupToast />
				<WrongExtensionToast />
				<SizeOverToast />
			</WrapperProfileSetup>
		</>
	);
};

export default ProfileSetup;
