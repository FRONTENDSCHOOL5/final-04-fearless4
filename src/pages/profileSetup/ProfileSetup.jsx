import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
} from './profileSetup.style.jsx';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';
import {
	ToastClose,
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';

const ProfileSetup = () => {
	const location = useLocation();
	console.log(location);
	// eslint-disable-next-line no-restricted-globals
	const email = location.state.email;
	// eslint-disable-next-line no-restricted-globals
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
	const navigate = useNavigate();

	// 테스트용 주석

	useEffect(() => {
		if (!userName) {
			setDisabled(true);
		}
	}, [userName]);

	const handleImageInputChange = async (e) => {
		const allowedExtensionsRegex = /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i;
		const maxImageSize = 10 * 1024 * 1024;
		const imageFile = e.target.files[0];

		if (imageFile) {
			if (imageFile.size > maxImageSize) {
				setShowSizeOverToast(true);
				setTimeout(() => setShowSizeOverToast(false), 3000);
				e.target.value = '';
				return;
			}

			const fileExtension = '.' + imageFile.name.split('.').pop().toLowerCase();
			if (!allowedExtensionsRegex.test(fileExtension)) {
				setShowWrongExtensionToast(true);
				setTimeout(() => setShowWrongExtensionToast(false), 3000);
				e.target.value = '';
				return;
			}

			// 유효성 검사를 통과한 경우에만 이미지 업로드 처리를 진행합니다.
			const formData = new FormData();
			const reader = new FileReader();

			formData.append('image', imageFile);

			try {
				const response = await axios.post(
					'https://api.mandarin.weniv.co.kr/image/uploadfile/',
					formData
				);

				const imageUrl =
					'https://api.mandarin.weniv.co.kr/' + response.data.filename;

				setSelectedImage(imageUrl);
			} catch (error) {
				console.error(error.response.data);
			}
		} else {
			e.target.value = ''; // 파일 선택 창을 비웁니다.
		}
	};
	const validateUserId = async () => {
		if (!userId || /^[A-Za-z0-9._]+$/.test(userId)) {
			setNotValidUserId(false);

			const data = {
				user: {
					accountname: userId,
				},
			};

			await axios
				.post('https://api.mandarin.weniv.co.kr/user/accountnamevalid/', data, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((response) => {
					console.log(response);
					if (response.data.message === '이미 가입된 계정ID 입니다.') {
						setIdDuplication(true);
					} else if (
						response.data.message === '사용 가능한 계정ID 입니다.' &&
						userName
					) {
						setIdDuplication(false);
						setDisabled(false);
					} else {
						console.log('접근 불가');
					}
				})
				.catch((error) => {
					console.error(error.response.data.message);
				});
		} else {
			setNotValidUserId(true);
		}
	};

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
				image: selectedImage,
			},
		};

		await axios
			.post('https://api.mandarin.weniv.co.kr/user/', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response.data);
				navigate('/');
			})
			.catch((error) => {
				console.error(error.response.data.message);
				console.log('오류 발생!');
			});
	};

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
		<WrapperProfileSetup>
			<Title mb>프로필 설정</Title>
			<DescriptionText>나중에 언제든지 변경할 수 있습니다.</DescriptionText>

			<WrapForm onSubmit={handleSubmit}>
				<Upload>
					<ImageInput
						type='file'
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
			<WrongExtensionToast />
			<SizeOverToast />
		</WrapperProfileSetup>
	);
};

export default ProfileSetup;
