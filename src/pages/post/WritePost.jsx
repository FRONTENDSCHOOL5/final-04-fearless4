import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/postAPI';
import { getMyInfo } from '../../api/profileApi';
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
import { Helmet } from 'react-helmet-async';

const WritePost = () => {
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [myProfileImage, setMyProfileImage] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);
	const inputRef = useRef(null);
	const textarea = useRef();
	const navigate = useNavigate();

	const {
		data: myInfo,
		isError,
		error,
	} = useQuery(['myProfileImage'], getMyInfo);

	const createPostMutation = useMutation(createPost, {
		onSuccess: (data) => {
			const id = data.data.post.id;
			navigate(`/post/view/${id}`);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	useEffect(() => {
		if (myInfo) {
			setMyProfileImage(myInfo.image);
		}
		if (isError) {
			console.error('프로필 이미지를 불러오지 못했습니다!', error);
		}
	}, [myInfo, isError, error]);

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
		createPostMutation.mutate(data);
	};

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
