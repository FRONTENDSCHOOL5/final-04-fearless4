import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	WrapperWritePost,
	ImageInput,
	ProfileImageMini,
	PostInputArea,
} from './writePost.style';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
	NavbarTitle,
} from '../../components/navbar/navbar.style';
import {
	SaveButton,
	ImageUploadButton,
} from '../../components/button/button.style';
import ProfilePic from '../../assets/image/profilePic.png';

const WritePost = () => {
	// 테스트용 메세지 추가
	return (
		<WrapperWritePost>
			<NavbarWrap spaceBetween>
				<Backspace />
				<SaveButton>업로드</SaveButton>
			</NavbarWrap>
			<ProfileImageMini src={ProfilePic}></ProfileImageMini>
			{/* 프로필 이미지를 내 프로필 이미지로 불러오는 기능 구현 필요 */}
			<PostInputArea
				placeholder='게시글 입력하기...'
				name=''
				id=''
				cols='30'
				rows='10'
			></PostInputArea>
			<ImageUploadButton>
				<ImageInput
					type='file'
					accept='image/*'
					// onChange={handleImageInputChange}
					// 이미지를 업로드했을 때 미리보기가 표시되도록 하는 기능 구현 필요
				/>
			</ImageUploadButton>
		</WrapperWritePost>
	);
};

export default WritePost;
