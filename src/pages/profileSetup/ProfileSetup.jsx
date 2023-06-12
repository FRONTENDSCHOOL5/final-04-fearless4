import React, { useState } from 'react';
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
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [intro, setIntro] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const [buttonInvalid, setButtonInvalid] = useState(false);

	const handleImageInputChange = (e) => {
		const file = e.target.files[0];
		setSelectedImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// const formData = new FormData();
		// formData.append('image', selectedImage);
		// console.log(formData);

		const data = {
			user: {
				username: userName,
				email: 'thisTest2Email@test.com',
				password: '1234abcd!',
				accountname: userId,
				intro: intro,
				image: '',
			},
		};
		console.log(data);

		axios
			// .post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData)
			// .then((response) => {
			// 	const imageUrl =
			// 		'https://api.mandarin.weniv.co.kr/' + response.data.filename;
			// 	data.user.image = imageUrl;
			// 	return axios.post('https://api.mandarin.weniv.co.kr/user', data);
			// })
			.post('https://api.mandarin.weniv.co.kr/user', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error.response.data);
				console.log('오류 발생!');
			});
	};

	return (
		<WrapperProfileSetup>
			<Title mb>프로필 설정</Title>
			<DescriptionText>나중에 언제든지 변경할 수 있습니다.</DescriptionText>

			<Upload>
				<ImageInput type='file' />
				<ProfileImage src={profilePic} alt='' />
				<ImageButton src={profileImageUploadButton} alt='' />
			</Upload>

			<WrapForm onSubmit={handleSubmit}>
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
						placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
						pattern='^[A-Za-z0-9._]+$'
					/>
					{userId && !/^[A-Za-z0-9._]+$/.test(userId) && (
						<Incorrect>
							*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
						</Incorrect>
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

				<LoginButton disabled={buttonInvalid}>트래블어스 시작하기</LoginButton>
			</WrapForm>
		</WrapperProfileSetup>
	);
};

export default ProfileSetup;
