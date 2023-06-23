import React, { useState, useEffect, startTransition } from 'react';
import { useParams } from 'react-router-dom';
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
import { API_URL } from '../../api';
import { useNavigate } from 'react-router-dom';

const ViewPost = () => {
	const token = localStorage.getItem('token');
	const [postData, setPostData] = useState(null);
	const [myProfilePic, setMyProfilePic] = useState('');
	const [myAccountName, setMyAccountName] = useState('');
	const [commentContent, setCommentContent] = useState('');
	const [comments, setComments] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	const getCommentList = () => {
		startTransition(async () => {
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
		});
	};

	const getMyInfo = async () => {
		try {
			await axios
				.get(`${API_URL}/user/myinfo`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setMyProfilePic(response.data.user.image);
					setMyAccountName(response.data.user.accountname);
				});
		} catch (error) {
			console.error('오류 발생!', error.response || error);
		}
	};

	useEffect(() => {
		const getApiData = async () => {
			try {
				await axios
					.get(`${API_URL}/post/${id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					})
					.then((response) => {
						setPostData(response.data.post);
					});
			} catch (error) {
				console.error('데이터를 불러오지 못했습니다!', error);
			}
		};
		getMyInfo();
		getApiData();
	}, [token, id]);

	useEffect(() => {
		getMyInfo();
		if (postData) {
			getCommentList();
		}
	}, [token, postData]);

	const handleCommentUpload = async () => {
		try {
			await axios.post(
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

	return (
		<WrapperViewPost>
			<NavbarWrap spaceBetween>
				<Backspace onClick={() => navigate(-1)} />
				<OptionModalTab></OptionModalTab>
			</NavbarWrap>
			<PostView>{postData && <Post postId={id} />}</PostView>
			<CommentSection>
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
						token={token}
						postId={postData.id}
						reloadComments={getCommentList}
						currentUsername={myAccountName}
					/>
				))}
			</CommentSection>
			<UploadComment>
				{postData && (
					<ProfileImageComment src={myProfilePic}></ProfileImageComment>
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
