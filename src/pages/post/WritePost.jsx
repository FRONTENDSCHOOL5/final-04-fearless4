// **3.1.11 게시글 작성 페이지**

// - 게시글을 작성할 수 있는 페이지로, 하단 메뉴바에서 `게시글 작성` 을 클릭하면 표시됩니다.
// - 글이 입력되거나 사진이 업로드 되면 `업로드` 버튼이 활성화되고, 버튼을 누르면 게시글이 업로드됩니다.
// - 사진은 우측 하단 버튼을 클릭하면 업로드할 수 있습니다.
//     - 기본 과제 : 한 장만 업로드 가능하도록 구현할 것.
//     - 도전 과제 : 여러 이미지 업로드, 단 최대 3장까지만 업로드 가능하도록 구현할 것.

// **3.1.10 게시글 댓글 페이지**

// - 게시글 하단에 말풍선 아이콘을 클릭하면 댓글을 확인하고 입력할 수 있는 페이지가 나타납니다.
// - 댓글 입력창에 텍스트를 입력하면 `게시` 버튼이 활성화됩니다.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	WrapperWritePost,
	ImageInput,
	ProfileImageMini,
	PostInputArea,
	PostForm,
	ImagePreview,
	TextForm,
} from './writePost.style';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import {
	SaveButton,
	ImageUploadButton,
} from '../../components/button/button.style';
import ProfilePic from '../../assets/image/profilePic.png';

const WritePost = () => {
	const [imageUrl, setImageUrl] = useState('');
	useEffect(() => {
		console.log(imageUrl);
	}, [imageUrl]);

	const handleImageInputChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setImageUrl(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
		console.log(file);
	};

	const handleDeleteImage = () => {
		setImageUrl('');
	};

	return (
		<>
			<WrapperWritePost>
				<NavbarWrap spaceBetween>
					<Backspace />
					<SaveButton>업로드</SaveButton>
				</NavbarWrap>
				<PostForm>
					<TextForm>
						<ProfileImageMini src={ProfilePic}></ProfileImageMini>
						{/* 프로필 이미지를 내 프로필 이미지로 불러오는 기능 구현 필요 */}
						<PostInputArea
							placeholder='게시글 입력하기...'
							name='post'
						></PostInputArea>
					</TextForm>

					{imageUrl && (
						<ImagePreview
							src={imageUrl}
							alt='Uploaded'
							handleDeleteImage={handleDeleteImage}
						/>
					)}
				</PostForm>
			</WrapperWritePost>

			<ImageUploadButton>
				<ImageInput
					type='file'
					accept='image/*'
					onChange={handleImageInputChange}
				/>
			</ImageUploadButton>
		</>
	);
};

export default WritePost;
