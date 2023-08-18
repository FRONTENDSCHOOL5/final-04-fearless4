import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	WrapperWritePost,
	ImageInput,
	ProfileImageMini,
	PostInputArea,
	PostForm,
	ImagePreview,
	TextForm,
	UploadButton,
} from './writePost.style';
import {
	ToastClose,
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { ImageUploadButton } from '../../components/button/button.style';
import profilePic from '../../assets/image/profilePic.png';
import { Helmet } from 'react-helmet';

const WritePost = () => {
	const token = localStorage.getItem('token');
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [myProfileImage, setMyProfileImage] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const inputRef = useRef(null);
	const textarea = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const loadMyProfileImage = async () => {
			try {
				await axios
					.get('https://api.mandarin.weniv.co.kr/user/myinfo', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						setMyProfileImage(response.data.user.image);
					});
			} catch (error) {
				console.error('프로필 이미지를 불러오지 못했습니다!', error);
			}
		};
		loadMyProfileImage();
	}, [token]);

	useEffect(() => {
		uploadImageUrl || text ? setDisabled(false) : setDisabled(true);
	}, [uploadImageUrl, text]);

	useEffect(() => {
		handleResizeHeight();
	}, [text]);

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

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

			reader.onloadend = () => {
				setUploadImageUrl(reader.result);
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

				setUploadImageUrl(imageUrl);
			} catch (error) {
				console.error(error.response.data);
			}
		} else {
			e.target.value = ''; // 파일 선택 창을 비웁니다.
		}
	};

	const handleDeleteImage = () => {
		setUploadImageUrl('');

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleResizeHeight = () => {
		textarea.current.style.height = '0';
		textarea.current.style.height = `${textarea.current.scrollHeight}` + 'px';
	};

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const handleSubmit = async () => {
		const data = {
			post: {
				content: text,
				image: uploadImageUrl,
			},
		};

		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};

		try {
			const response = await axios.post(
				'https://api.mandarin.weniv.co.kr/post',
				data,
				{ headers }
			);

			const id = response.data.post.id;
			navigate(`/post/view/${id}`);
		} catch (error) {
			console.error(error);
		}
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
		<>
			<Helmet>
				<title>TravelUs | 게시글 작성</title>
			</Helmet>
			<WrapperWritePost>
				<NavbarWrap spaceBetween>
					<Backspace aria-label='뒤로가기' onClick={() => navigate(-1)} />
					<UploadButton disabled={disabled} onClick={handleSubmit}>
						업로드
					</UploadButton>
				</NavbarWrap>
				<PostForm>
					<TextForm>
						<ProfileImageMini
							src={myProfileImage}
							onError={handleImgError}
						></ProfileImageMini>
						<PostInputArea
							ref={textarea}
							placeholder='게시글 입력하기...'
							name='post'
							value={text}
							rows={1}
							onChange={handleTextChange}
						></PostInputArea>
					</TextForm>
					{uploadImageUrl && (
						<ImagePreview
							src={uploadImageUrl}
							alt='Uploaded'
							handleDeleteImage={handleDeleteImage}
						/>
					)}
				</PostForm>
			</WrapperWritePost>
			<ImageUploadButton>
				<ImageInput
					ref={inputRef}
					type='file'
					accept='image/*'
					onChange={handleImageInputChange}
				/>
			</ImageUploadButton>
			<WrongExtensionToast />
			<SizeOverToast />
		</>
	);
};

export default WritePost;
