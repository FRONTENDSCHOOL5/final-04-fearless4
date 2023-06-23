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
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [postData, setPostData] = useState(null);
	const [myProfilePic, setMyProfilePic] = useState('');
	const [myAccountName, setMyAccountName] = useState('');
	const [commentContent, setCommentContent] = useState('');
	const [comments, setComments] = useState([]);
	const [isPostModal, setIsPostModal] = useState(false);
	const [isPostDeleteCheckModal, setIsPostDeleteCheckModal] = useState(false);
	const [isReportModal, setIsReportModal] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	// const handlePostModalOptionClick = () => {
	// 	postData.author.accountname === myAccountName
	// 		? setIsPostModal(true)
	// 		: setIsReportModal(true);
	// };

	// const handlePostModalClose = () => {
	// 	setIsPostModal(false);
	// };

	// 게시글 모달 삭제 버튼 클릭 시 코드
	// const handlePostDeleteClick = () => {
	// 	setIsPostDeleteCheckModal(true);
	// };

	// 게시글 모달 수정 버튼 클릭 시 코드
	// const handlePostEditClick = () => {
	// 	if (postData) {
	// 		navigate('/editPost', {
	// 			state: {
	// 				id: postData.id,
	// 				content: postData.content,
	// 				image: postData.image,
	// 			},
	// 		});
	// 	}
	// };

	// 게시글 삭제 모달 취소 시 코드
	// const handlePostDeleteCheckModalClose = () => {
	// 	setIsPostDeleteCheckModal(false);
	// };

	// 게시글 삭제 모달 클릭 시 코드
	// const handlePostDeleteConfirmClick = async () => {
	// 	try {
	// 		await axios
	// 			.delete(`${API_URL}/post/${postData.id}`, {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 					'Content-Type': 'application/json',
	// 				},
	// 			})
	// 			.then((response) => {
	// 				console.log(response);
	// 			});
	// 	} catch (error) {
	// 		console.error('오류 발생!');
	// 	}
	// 	setIsPostDeleteCheckModal(false);
	// };

	const handleReportClick = () => {
		console.log('댓글이 신고되었습니다.');
		setIsReportModal(false);
	};

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
						console.log(response.data);
						setComments(sortedComments);
					});
			} catch (error) {
				console.error('오류 발생!', error.response || error);
			}
		});
	};

	const getMyProfilePic = async () => {
		try {
			await axios
				.get(`${API_URL}/user/myinfo`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setMyProfilePic(response.data.user.image);
					console.log(response.data);
				});
		} catch (error) {
			console.error('오류 발생!', error.response || error);
		}
	};

	const getMyAccountName = async () => {
		try {
			await axios
				.get(`${API_URL}/user/myinfo`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setMyAccountName(response.data.user.accountname);
				});
		} catch (error) {
			console.error('오류 발생!', error.response || error);
		}
	};

	useEffect(() => {
		const getApiData = async () => {
			console.log(id);
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
						console.log(response.data);
					});
			} catch (error) {
				console.error('데이터를 불러오지 못했습니다!', error);
			}
		};
		getMyAccountName();
		getApiData();
	}, [token, id]);

	useEffect(() => {
		getMyProfilePic();
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
