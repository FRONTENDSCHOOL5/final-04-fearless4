import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../../components/post/post.style';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import {
	WrapperViewPost,
	PostView,
	CommentSection,
	UploadComment,
	CommentInputArea,
	CommentUploadButton,
	ProfileImageComment,
} from './viewPost.style';
import {
	DarkBackground,
	ModalWrap,
	ModalText,
} from '../../components/modal/modal.style';
import { Comment } from './Comment';
import { API_URL } from '../../api';

const ViewPost = () => {
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [postData, setPostData] = useState(null);
	const [commentContent, setCommentContent] = useState('');
	const [comments, setComments] = useState([]);
	const [isPostModal, setIsPostModal] = useState(false);

	const handlePostModalOptionClick = () => {
		setIsPostModal(true);
	};

	const handlePostModalClose = () => {
		setIsPostModal(false);
	};

	const handleDotClick = () => {
		console.log('Dot 클릭됨!');
	};

	// 게시글 모달 삭제 버튼 클릭 시 코드
	const handlePostDeleteClick = () => {};
	// 게시글 모달 수정 버튼 클릭 시 코드
	const handlePostEditClick = () => {};

	const getCommentList = async () => {
		try {
			await axios
				.get(`${API_URL}/post/${postData.id}/comments/?limit=infinity`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				})
				.then((response) => {
					const sortedComments = response.data.comments.sort((a, b) => {
						return new Date(a.createdAt) - new Date(b.createdAt);
					});
					setComments(sortedComments);
				});
		} catch (error) {
			console.error('오류 발생!', error.response || error);
		}
	};

	useEffect(() => {
		const getApiData = async () => {
			try {
				await axios
					.get(
						// 게시물 리스트에서 받아오기 때문에 거기서 받아온 post id를 프롭스로 여기에 넘겨 주어야 함
						// 현재는 임시 데이터 지정
						`${API_URL}/post/64914e1db2cb20566347a3d5`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-type': 'application/json',
							},
						}
					)
					.then((response) => {
						setPostData(response.data.post);
					});
			} catch (error) {
				console.error('데이터를 불러오지 못했습니다!', error);
			}
		};
		getApiData();
	}, [token]);

	useEffect(() => {
		if (postData) {
			getCommentList();
		}
	}, [token, postData]);

	const handleCommentUpload = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/post/${postData.id}/comments`,
				{
					comment: {
						content: commentContent,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);

			setCommentContent('');
			await getCommentList();
		} catch (error) {
			console.error('댓글을 업로드하지 못했습니다!', error.response.data);
		}
	};

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
						handlePostModalOptionClick={handlePostModalOptionClick}
					/>
				)}
			</PostView>
			<CommentSection>
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</CommentSection>
			<UploadComment>
				{postData && (
					<ProfileImageComment
						src={postData.author.image}
					></ProfileImageComment>
				)}
				<CommentInputArea
					placeholder='댓글 입력하기...'
					value={commentContent}
					onChange={(e) => setCommentContent(e.target.value)}
					rows={1}
				></CommentInputArea>
				<CommentUploadButton onClick={handleCommentUpload}>
					게시
				</CommentUploadButton>
			</UploadComment>
			{isPostModal && (
				<DarkBackground onClick={handlePostModalClose}>
					<ModalWrap>
						<ModalText onClick={handlePostDeleteClick}>삭제</ModalText>
						<ModalText onClick={handlePostEditClick}>수정</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
		</WrapperViewPost>
	);
};

export default ViewPost;
