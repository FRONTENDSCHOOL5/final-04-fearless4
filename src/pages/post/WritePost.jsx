import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessInstance } from '../../api/axiosInstance';
import imageValidation from '../../imageValidation';
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
				const response = await accessInstance.get(`/user/myinfo`);
				setMyProfileImage(response.data.user.image);
			} catch (error) {
				console.error('프로필 이미지를 불러오지 못했습니다!', error);
			}
		};
		loadMyProfileImage();
	}, [token]);

	useEffect(() => {
		uploadImageUrl || text ? setDisabled(false) : setDisabled(true);
	}, [uploadImageUrl, text]);

	const handleTextChange = (e) => {
		setText(e.target.value);
		handleResizeHeight();
	};

	const handleImageInputChange = async (e) => {
		await imageValidation(
			e,
			10,
			320,
			setUploadImageUrl,
			setShowSizeOverToast,
			setShowWrongExtensionToast
		);
	};

	const handleDeleteImage = () => {
		setUploadImageUrl('');
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleResizeHeight = () => {
		textarea.current.style.height = '0';
		textarea.current.style.height = `${textarea.current.scrollHeight}px`;
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

		try {
			const response = await accessInstance.post('/post', data);
			const id = response.data.post.id;
			navigate(`/post/view/${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Helmet>
				<title>TravelUs | 게시글 작성</title>
			</Helmet>
			<WrapperWritePost>
				<NavbarWrap spaceBetween>
					<Backspace onClick={() => navigate(-1)} />
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
							onClick={handleDeleteImage}
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
			{showWrongExtensionToast && (
				<ToastContainer>
					<ToastIcon>😵‍💫</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>이미지</ToastMsgBold>만 업로드 해 주세요!
					</ToastMsg>
				</ToastContainer>
			)}
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
};

export default WritePost;
