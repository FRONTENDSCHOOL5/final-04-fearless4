import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

	// 테스트용 주석

	useEffect(() => {
		if (!userName) {
			setDisabled(true);
		}
	}, [userName]);

	console.log(userName, !notValidUserId, !idDuplication);
	const handleImageInputChange = async (e) => {
		const formData = new FormData();
		const imageFile = e.target.files[0];
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
			})
			.catch((error) => {
				console.error(error.response.data.message);
				console.log('오류 발생!');
			});
	};

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
		</WrapperProfileSetup>
	);
};

export default ProfileSetup;
