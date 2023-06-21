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
import { Comment } from './Comment';

const ViewPost = () => {
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [postData, setPostData] = useState(null);
	const [commentContent, setCommentContent] = useState('');

	const [comments, setComments] = useState([]);

	useEffect(() => {
		const getApiData = async () => {
			try {
				await axios
					.get(
						// 게시물 리스트에서 받아오기 때문에 거기서 받아온 post id를 프롭스로 여기에 넘겨 주어야 함
						// 현재는 임시 데이터 지정
						'https://api.mandarin.weniv.co.kr/post/64914e1db2cb20566347a3d5',
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
		const getCommentList = async () => {
			try {
				await axios
					.get(
						`https://api.mandarin.weniv.co.kr/post/${postData.id}/comments`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-type': 'application/json',
							},
						}
					)
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
		if (postData) {
			getCommentList();
		}
	}, [token, postData]);

	const handleCommentUpload = async () => {
		try {
			const response = await axios.post(
				`https://api.mandarin.weniv.co.kr/post/${postData.id}/comments`,
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
		</WrapperViewPost>
	);
};

export default ViewPost;
