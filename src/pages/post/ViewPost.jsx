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
import {
	ModalWrap,
	ModalText,
	DarkBackground,
	CheckModalWrap,
	CheckMsg,
	CheckButtonWrap,
	CheckLogout,
} from '../../components/modal/modal.style';
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
	const [isLoading, setIsLoading] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [isCheckModal, setIsCheckModal] = useState(false);
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

	const handleModalOpen = (e) => {
		e.preventDefault();
		setIsModal(true);
	};

	const handleModalClose = (e) => {
		e.preventDefault();
		// e.currentTarget 현재 handleModalClose가 부착된 요소
		// e.target 내가 클릭한 자식 요소
		if (e.target === e.currentTarget) {
			setIsModal(false);
			setIsCheckModal(false);
		}
	};

	const handleCheckModal = (e) => {
		e.preventDefault();
		setIsCheckModal(true);
	};

	const accountLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		navigate('/');
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
		getApiData();
	}, [token, id]);

	useEffect(() => {
		getMyInfo();
		if (postData) {
			getCommentList();
		}
		setIsLoading(true);
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
				<OptionModalTab onClick={handleModalOpen}></OptionModalTab>
			</NavbarWrap>
			{isLoading && <PostView>{postData && <Post postId={id} />}</PostView>}
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
			{isModal && (
				<DarkBackground onClick={handleModalClose}>
					<ModalWrap>
						<ModalText>설정 및 개인정보</ModalText>
						<ModalText onClick={handleCheckModal}>로그아웃</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
			{isCheckModal && (
				<DarkBackground onClick={handleModalClose}>
					<CheckModalWrap>
						<CheckMsg>로그아웃하시겠어요?</CheckMsg>
						<CheckButtonWrap>
							<CheckLogout onClick={handleModalClose}>취소</CheckLogout>
							<CheckLogout check onClick={accountLogout}>
								로그아웃
							</CheckLogout>
						</CheckButtonWrap>
					</CheckModalWrap>
				</DarkBackground>
			)}
		</WrapperViewPost>
	);
};

export default ViewPost;
