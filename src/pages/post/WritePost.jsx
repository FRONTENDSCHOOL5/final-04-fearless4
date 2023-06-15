import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperWriteProfile } from './writePost.style';
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

const WritePost = () => {
	return (
		<WrapperWriteProfile>
			<NavbarWrap spaceBetween>
				<Backspace />
				<SaveButton>업로드</SaveButton>
			</NavbarWrap>
			<img src='' alt='' />
			<textarea
				placeholder='게시글 입력하기...'
				name=''
				id=''
				cols='30'
				rows='10'
			></textarea>
			<ImageUploadButton>
				<input type='file' />
			</ImageUploadButton>
		</WrapperWriteProfile>
	);
};

export default WritePost;
