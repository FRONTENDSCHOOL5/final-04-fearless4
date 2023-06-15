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
	const token = location.state.token;
	const profileId = location.state.profileId;
	const profileName = location.state.profileName;
	const profileIntro = location.state.profileIntro;
	const profileImg = location.state.profileImage;

	useEffect(() => {
		setSelectedImage(profileImg);
		setUserId(profileId);
		setUserName(profileName);
		setIntro(profileIntro);
	}, []);

	useEffect(() => {
		if (!userName) {
			setDisabled(true);
		}
	}, [userName]);

	// console.log(userName, !notValidUserId, !idDuplication);

	const handleImageInputChange = async (e) => {
		const formData = new FormData();
		const imageFile = e.target.files[0];
		formData.append('image', imageFile);

		try {
			const response = await axios.post(`${url}/image/uploadfile/`, formData);
			console.log(response);

			const imageUrl = `${url}/` + response.data.filename;

			setSelectedImage(imageUrl);
			console.log(imageUrl);
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
				} else {
					console.log('접근 불가');
				}
			} catch (error) {
				console.error('에러입니다.', error);
			}
		} else {
			setNotValidUserId(true);
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
			navigate('/myprofile', {
				state: {
					userId: userId,
				},
			});
		} catch (error) {
			console.error('에러입니다.', error);
			console.log('오류 발생!');
		}
	};

	return (
		<WrapperProfileSetup>
			<NavbarWrap profile='true'>
				<Backspace></Backspace>
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
