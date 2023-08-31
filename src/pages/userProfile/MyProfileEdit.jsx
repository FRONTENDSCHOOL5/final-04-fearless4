import React, { useState, useEffect } from 'react';
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
	ProfileEditTitle,
	LabelStyleImg,
} from './myProfileEdit.style.jsx';
import profilePic from '../../assets/image/profilePic.png';
import profileImageUploadButton from '../../assets/image/profileImageUploadButton.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	Backspace,
	NavbarWrap,
} from '../../components/navbar/navbar.style.jsx';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { Helmet } from 'react-helmet-async';
import imageValidation from '../../imageValidation.js';
import { useMutation } from '@tanstack/react-query';
import { postAccountValid, putProfileEdit } from '../../api/profileApi.js';

export default function ProfileSetup() {
	const location = useLocation();
	const profile = location.state.profile;
	const [userName, setUserName] = useState(profile.username);
	const [userId, setUserId] = useState(profile.accountname);
	const [intro, setIntro] = useState(profile.intro);
	const [selectedImage, setSelectedImage] = useState(profile.image);
	const [debounceValue, setDebounceValue] = useState(userId);
	const [idDuplication, setIdDuplication] = useState(false);
	const [notValidUserId, setNotValidUserId] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [showProfileEditToast, setShowProfileEditToast] = useState(false);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const navigate = useNavigate();
	const accountId = localStorage.getItem('userAccountName');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(userId);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [userId]);

	useEffect(() => {
		if (!userName || !userId) {
			setDisabled(true);
		}
		validateUserId();
	}, [debounceValue, userName]);

	useEffect(() => {
		userId === profile.accountname &&
		userName === profile.username &&
		intro === profile.intro
			? setDisabled(false)
			: setDisabled(true);
	}, []);

	const onChange = (e) => {
		if (e.target.name === 'username') {
			setUserName(e.target.value);
		} else if (e.target.name === 'userid') {
			setUserId(e.target.value);
		} else if (e.target.name === 'userintro') {
			setIntro(e.target.value);
		}
	};

	const handleImageInputChange = (e) => {
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
			if (userId === accountId || data === '사용 가능한 계정ID 입니다.') {
				setIdDuplication(false);
				if (userName && userId) {
					setDisabled(false);
				}
			} else if (data === '이미 가입된 계정ID 입니다.') {
				setIdDuplication(true);
				setDisabled(true);
			}
		},
		onError: () => {
			console.error('실패');
		},
	});

	const putProfileEditMutation = useMutation(putProfileEdit, {
		onSuccess: () => {
			setShowProfileEditToast(true);
			setTimeout(() => {
				setShowProfileEditToast(false);
				localStorage.setItem('userAccountName', userId);
				navigate(`../../../profile`);
			}, 1000);
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

		putProfileEditMutation.mutate(data);
	};

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const ProfileEditToast = () => (
		<>
			{showProfileEditToast && (
				<ToastContainer>
					<ToastIcon>😆</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>프로필</ToastMsgBold>이 수정되었습니다.
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
				<title>TravelUs | 프로필 수정</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace aria-label='뒤로가기' to={'../../profile'} />
				<SaveButton onClick={profileEdit} type='button' disabled={disabled}>
					저장
				</SaveButton>
			</NavbarWrap>
			<WrapperProfileSetup>
				<ProfileEditTitle>
					{profile.accountname + '의 프로필 편집'}
				</ProfileEditTitle>
				<WrapForm>
					<Upload>
						<LabelStyleImg htmlFor='user-image'>
							{profile.accountname + '의 프로필 이미지'}
						</LabelStyleImg>
						<ImageInput
							type='file'
							id='user-image'
							accept='image/*'
							onChange={handleImageInputChange}
						/>
						<ProfileImage
							src={selectedImage || profile.image || profilePic}
							onError={handleImgError}
							alt=''
						/>{' '}
						<ImageButton src={profileImageUploadButton} alt='' />
					</Upload>

					<FormElement>
						<LabelStyle htmlFor='user-name'>사용자 이름</LabelStyle>
						<InputStyle
							type='text'
							name='username'
							placeholder='2~10자 이내여야 합니다.'
							value={userName}
							onChange={onChange}
						/>
					</FormElement>

					<FormElement>
						<LabelStyle htmlFor='user-id'>계정 ID</LabelStyle>
						<InputStyle
							type='text'
							id='user-id'
							name='userid'
							value={userId}
							onChange={onChange}
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
							name='userintro'
							placeholder='자신에 대해서 소개해 주세요!'
							value={intro}
							onChange={onChange}
						/>
					</FormElement>
				</WrapForm>
				<ProfileEditToast />
				<WrongExtensionToast />
				<SizeOverToast />
			</WrapperProfileSetup>
		</>
	);
}
