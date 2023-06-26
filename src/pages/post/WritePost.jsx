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
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { ImageUploadButton } from '../../components/button/button.style';
import profilePic from '../../assets/image/profilePic.png';

const WritePost = () => {
	const token = localStorage.getItem('token');
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [myProfileImage, setMyProfileImage] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
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

	const handleImageInputChange = async (e) => {
		const allowedExtensionsRegex = /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i;
		const maxImageSize = 10 * 1024 * 1024;
		const imageFile = e.target.files[0];

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
		textarea.current.style.height = 'auto';
		textarea.current.style.height = `${textarea.current.scrollHeight}px`;
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
		handleResizeHeight();
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
			navigate(`/viewPost/${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
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
		</WrapperWritePost>
	);
};

export default WritePost;
