import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	WrapForm,
	InputStyle,
	Incorrect,
} from '../../components/form/form.style.jsx';
import { SaveButton } from '../../components/button/button.style.jsx';
import {
	WrapperProfileSetup,
	Upload,
	ProfileImage,
	ImageButton,
	FormElement,
	LabelStyle,
	ImageInput,
} from './myProfileEdit.style.jsx';
import { API_URL } from '../../api.js';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Backspace,
	NavbarWrap,
} from '../../components/navbar/navbar.style.jsx';

export default function ProfileSetup() {
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [intro, setIntro] = useState('');
	const [selectedImage, setSelectedImage] = useState('');
	const [idDuplication, setIdDuplication] = useState(false);
	const [notValidUserId, setNotValidUserId] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	const url = API_URL;
	const token = localStorage.getItem('token');
	const profileId = location.state.profileId;
	const profileName = location.state.profileName;
	const profileIntro = location.state.profileIntro;
	const profileImg = location.state.profileImage;

	useEffect(() => {
		setSelectedImage(profileImg);
		setUserId(profileId);
		setUserName(profileName);
		setIntro(profileIntro);
		setDisabled(false);
	}, []);

	useEffect(() => {
		userId === profileId &&
		userName === profileName &&
		intro === profileIntro &&
		selectedImage === profileImg
			? setDisabled(false)
			: setDisabled(true);
	}, [userId]);

	// console.log(userName, !notValidUserId, !idDuplication);

	const handleImageInputChange = async (e) => {
		const allowedExtensionsRegex = /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i;
		const maxImageSize = 10 * 1024 * 1024;
		const formData = new FormData();
		const imageFile = e.target.files[0];
		formData.append('image', imageFile);

		if (imageFile) {
			if (imageFile.size > maxImageSize) {
				alert(
					'이미지 크기가 너무 큽니다.\n10MB보다 작은 이미지를 업로드 해 주세요!'
				);
				e.target.value = ''; // 파일 선택 창을 비웁니다.
				return;
			}

			const fileExtension = '.' + imageFile.name.split('.').pop().toLowerCase();
			if (!allowedExtensionsRegex.test(fileExtension)) {
				alert(
					'올바른 파일 확장자가 아닙니다!\n올바른 파일 확장자는 다음과 같습니다: .jpg, .gif, .png, .jpeg, .bmp, .tif, .heic'
				);
				e.target.value = ''; // 파일 선택 창을 비웁니다.
				return;
			}

			// 유효성 검사를 통과한 경우에만 이미지 업로드 처리를 진행합니다.
			const formData = new FormData();
			const reader = new FileReader();

			formData.append('image', imageFile);

			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};

			if (imageFile) {
				reader.readAsDataURL(imageFile);
			}

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

			try {
				const response = await axios.post(
					`${url}/user/accountnamevalid/`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				if (
					userId === profileId ||
					response.data.message === '사용 가능한 계정ID 입니다.'
				) {
					console.log(profileId);
					setIdDuplication(false);
					setDisabled(false);
				} else if (response.data.message === '이미 가입된 계정ID 입니다.') {
					setIdDuplication(true);
					setDisabled(true);
				} else {
					console.log('접근 불가');
				}
			} catch (error) {
				console.error('에러입니다.', error);
			}
		} else {
			setNotValidUserId(true);
			setIdDuplication(false);
			setDisabled(true);
		}
	};

	const profileEdit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', selectedImage);

		const data = {
			user: {
				username: userName,
				accountname: userId,
				intro: intro,
				image: selectedImage,
			},
		};

		try {
			const response = await axios.put(`${url}/user/`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			console.log(response.data);
			navigate('/myprofile');
		} catch (error) {
			console.error('에러입니다.', error);
			console.log('오류 발생!');
		}
	};

	return (
		<WrapperProfileSetup>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<SaveButton onClick={profileEdit} type='button' disabled={disabled}>
					저장
				</SaveButton>
			</NavbarWrap>

			<WrapForm>
				<Upload>
					<ImageInput
						type='file'
						accept='image/*'
						onChange={handleImageInputChange}
					/>
					<ProfileImage
						src={selectedImage || profileImg || profilePic}
						alt=''
					/>{' '}
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
			</WrapForm>
		</WrapperProfileSetup>
	);
}
