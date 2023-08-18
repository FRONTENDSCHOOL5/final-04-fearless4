import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	WrapperWritePost,
	ImageInput,
	ProfileImageMini,
	PostInputArea,
	PostForm,
	ImagePreview,
	UploadButton,
	TextForm,
} from './writePost.style';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { ImageUploadButton } from '../../components/button/button.style';
import profilePic from '../../assets/image/profilePic.png';
import { accessInstance } from '../../api/axiosInstance';
import { Helmet } from 'react-helmet';
import imageValidation from '../../imageValidation';

const EditPost = () => {
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [myProfileImage, setMyProfileImage] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [showPostEditToast, setShowPostEditToast] = useState(false);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const inputRef = useRef(null);
	const textarea = useRef();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state) {
			setText(location.state.content);
			setUploadImageUrl(location.state.image);
		}
	}, [location.state]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const loadMyProfileImage = async () => {
			try {
				const response = await accessInstance.get('/user/myinfo');
				setMyProfileImage(response.data.user.image);
			} catch (error) {
				console.error('프로필 이미지를 불러오지 못했습니다!', error);
			}
		};
		loadMyProfileImage();
	}, []);

	useEffect(() => {
		uploadImageUrl || text ? setDisabled(false) : setDisabled(true);
	}, [uploadImageUrl, text]);

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

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const handleDeleteImage = () => {
		setUploadImageUrl('');
		if (inputRef.current) inputRef.current.value = '';
	};

	const handleResizeHeight = () => {
		textarea.current.style.height = 'auto';
		textarea.current.style.height = `${textarea.current.scrollHeight}px`;
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
		handleResizeHeight();
	};

	const handleSubmit = async () => {
		const data = {
			post: {
				content: text,
				image: uploadImageUrl,
			},
		};

		try {
			await accessInstance.put(`/post/${location.state.id}`, data);
			setShowPostEditToast(true);
			setTimeout(() => {
				setShowPostEditToast(false);
				navigate(`/post/view/${location.state.id}`);
			}, 1000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Helmet>
				<title>TravelUs | 게시글 수정</title>
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
						<ProfileImageMini src={myProfileImage} onError={handleImgError} />
						<PostInputArea
							ref={textarea}
							placeholder='게시글 입력하기...'
							value={text}
							rows={1}
							onChange={handleTextChange}
						/>
					</TextForm>
					{uploadImageUrl && (
						<ImagePreview
							src={uploadImageUrl}
							alt='Uploaded'
							handleDeleteImage={handleDeleteImage}
						/>
					)}
				</PostForm>
				<ImageUploadButton>
					<ImageInput
						ref={inputRef}
						type='file'
						accept='image/*'
						onChange={handleImageInputChange}
					/>
				</ImageUploadButton>
				{showPostEditToast && (
					<ToastContainer>
						<ToastIcon>🛠️</ToastIcon>
						<ToastMsg>
							<ToastMsgBold>게시글</ToastMsgBold>이 수정되었습니다.
						</ToastMsg>
					</ToastContainer>
				)}
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
			</WrapperWritePost>
		</>
	);
};

export default EditPost;
