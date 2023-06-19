// **3.1.11 게시글 작성 페이지**

// - 게시글을 작성할 수 있는 페이지로, 하단 메뉴바에서 `게시글 작성` 을 클릭하면 표시됩니다.
// - 글이 입력되거나 사진이 업로드 되면 `업로드` 버튼이 활성화되고, 버튼을 누르면 게시글이 업로드됩니다.
// - 사진은 우측 하단 버튼을 클릭하면 업로드할 수 있습니다.
//     - 기본 과제 : 한 장만 업로드 가능하도록 구현할 것.
//     - 도전 과제 : 여러 이미지 업로드, 단 최대 3장까지만 업로드 가능하도록 구현할 것.

// **3.1.10 게시글 댓글 페이지**

// - 게시글 하단에 말풍선 아이콘을 클릭하면 댓글을 확인하고 입력할 수 있는 페이지가 나타납니다.
// - 댓글 입력창에 텍스트를 입력하면 `게시` 버튼이 활성화됩니다.

import React, { useState, useEffect, useRef } from 'react';
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

const WritePost = () => {
	const [uploadImageUrl, setUploadImageUrl] = useState('');
	const [myProfileImage, setMyProfileImage] = useState('');
	const [text, setText] = useState('');
	const [disabled, setDisabled] = useState(true);
	const inputRef = useRef(null);
	const textarea = useRef();

	useEffect(() => {
		const loadMyProfileImage = async () => {
			try {
				const token = localStorage.getItem('token');
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
	}, []);

	useEffect(() => {
		uploadImageUrl || text ? setDisabled(false) : setDisabled(true);
	}, [uploadImageUrl, text]);

	const handleImageInputChange = async (e) => {
		const formData = new FormData();
		const imageFile = e.target.files[0];
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

	const handleSubmit = async () => {
		const data = {
			post: {
				content: text,
				image: uploadImageUrl,
			},
		};

		const token = localStorage.getItem('token');
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
			console.log(response);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<WrapperWritePost>
			<NavbarWrap spaceBetween>
				<Backspace />
				<UploadButton disabled={disabled} onClick={handleSubmit}>
					업로드
				</UploadButton>
			</NavbarWrap>
			<PostForm>
				<TextForm>
					<ProfileImageMini src={myProfileImage}></ProfileImageMini>
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
