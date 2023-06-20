import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../../components/post/post.style';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import ProfilePic from '../../assets/image/profilePic.png';
import {
	WrapperViewPost,
	Comment,
	PostView,
	CommentSection,
	UploadComment,
	CommentInputArea,
	CommentUploadButton,
	ProfileImageComment,
} from './ViewPost.style';

const ViewPost = () => {
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [postData, setPostData] = useState(null);
	console.log(token);

	useEffect(() => {
		const apiData = async () => {
			try {
				await axios
					.get(
						'https://api.mandarin.weniv.co.kr/post/64912d1eb2cb205663424bf1',
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-type': 'application/json',
							},
						}
					)
					.then((response) => {
						console.log(response.data.post);
						setPostData(response.data.post);
					});
			} catch (error) {
				console.error('데이터를 불러오지 못했습니다!', error);
			}
		};
		apiData();
	}, [token]);

	const formatCreatedAt = (createdAt) => {
		const date = new Date(createdAt);
		const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		return date.toLocaleDateString('ko-KR', options);
	};

	return (
		<WrapperViewPost>
			<NavbarWrap spaceBetween>
				<Backspace />
				<OptionModalTab></OptionModalTab>
			</NavbarWrap>
			<PostView>
				{postData && (
					<Post
						myProfileImg={postData.author.image}
						username={postData.author.username}
						accountname={postData.author.accountname}
						content={postData.content}
						image={postData.image}
						heartCount={postData.heartCount}
						commentCount={postData.commentCount}
						createdAt={formatCreatedAt(postData.createdAt)}
					/>
				)}
			</PostView>
			<CommentSection>
				<Comment></Comment>
			</CommentSection>
			<UploadComment>
				<ProfileImageComment src={ProfilePic}></ProfileImageComment>
				<CommentInputArea placeholder='댓글 입력하기...'></CommentInputArea>
				<CommentUploadButton>게시</CommentUploadButton>
			</UploadComment>
		</WrapperViewPost>
	);
};

export default ViewPost;
