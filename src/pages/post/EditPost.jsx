import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { getMyInfo } from '../../api/profileApi';
import { updatePost } from '../../api/postAPI';
import { Helmet } from 'react-helmet-async';
import imageValidation from '../../imageValidation';

const EditPost = () => {
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [showPostEditToast, setShowPostEditToast] = useState(false);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const inputRef = useRef(null);
	const textarea = useRef();
	const location = useLocation();
	const navigate = useNavigate();

	const {
		data: myInfo,
		isError,
		error,
	} = useQuery(['myProfileImage'], getMyInfo);

	if (isError) {
		console.error('프로필 이미지를 불러오지 못했습니다!', error);
	}

	const mutation = useMutation((data) => updatePost(location.state.id, data), {
		onSuccess: () => {
			setShowPostEditToast(true);
			setTimeout(() => {
				setShowPostEditToast(false);
				navigate(`/post/view/${location.state.id}`);
			}, 1000);
		},
	});

	const handleSubmit = () => {
		mutation.mutate({
			post: {
				content: text,
				image: uploadImageUrl,
			},
		});
	};

	useEffect(() => {
		if (location.state) {
			setText(location.state.content);
			setUploadImageUrl(location.state.image);
		}
	}, [location.state]);

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
						<ProfileImageMini src={myInfo?.image} onError={handleImgError} />
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
