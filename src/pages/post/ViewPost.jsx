import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import ProfilePic from '../../assets/image/profilePic.png';
import {
	WrapperViewPost,
	OptionModalTabComment,
	PostView,
	CommentSection,
	UploadComment,
	CommentInputArea,
	CommentUploadButton,
	ProfileImageComment,
} from './ViewPost.style';

const ViewPost = () => {
	return (
		<WrapperViewPost>
			<NavbarWrap spaceBetween>
				<Backspace />
				<OptionModalTab></OptionModalTab>
			</NavbarWrap>
			<PostView>
				<p>여기는 게시글 컴포넌트가 들어갈 자리입니다.</p>
			</PostView>
			<CommentSection></CommentSection>
			<UploadComment>
				<ProfileImageComment src={ProfilePic}></ProfileImageComment>
				<CommentInputArea placeholder='여기에 텍스트 입력'></CommentInputArea>
				<CommentUploadButton>게시</CommentUploadButton>
			</UploadComment>
		</WrapperViewPost>
	);
};

export default ViewPost;

//
