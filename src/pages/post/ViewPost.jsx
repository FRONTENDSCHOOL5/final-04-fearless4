import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostDeleteContext } from './PostDeleteContext';
import {
	CommentCountProvider,
	useCommentCount,
} from '../post/CommentCounterContext.jsx';
import { useParams } from 'react-router-dom';
import { getCommentList, uploadComment } from '../../api/commentAPI';
import { getPostData } from '../../api/postAPI';
import { getMyInfo } from '../../api/profileApi';
import { Post } from '../../components/post/Post';
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
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import profilePic from '../../assets/image/profilePic.png';
import { Comment } from '../../components/post/Comment';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ViewPost = () => {
	const currentUserAccountName = localStorage.getItem('userAccountName');
	const [myProfilePic, setMyProfilePic] = useState('');
	const [myAccountName, setMyAccountName] = useState('');
	const [commentContent, setCommentContent] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [isCheckModal, setIsCheckModal] = useState(false);
	const [showCommentToast, setShowCommentToast] = useState(false);
	const [deletedPostId, setDeletedPostId] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	const queryClient = useQueryClient();

	const loadMyInfo = async () => {
		try {
			const myInfo = await getMyInfo();
			setMyProfilePic(myInfo.image);
			setMyAccountName(myInfo.accountname);
		} catch (error) {
			console.error('오류 발생!', error);
			throw error;
		}
	};

	// 게시글 데이터를 불러오는 로직
	const {
		data: postData,
		isLoading,
		isError,
	} = useQuery(['post', id], () => getPostData(id));

	// 댓글을 불러오는 로직
	const { data: comments } = useQuery(
		['comments', postData?.id],
		() => getCommentList(postData?.id),
		{
			enabled: !!postData?.id,
		}
	);

	// 댓글을 업로드하는 로직
	const commentMutation = useMutation(
		(content) => uploadComment(postData.id, content),
		{
			onSuccess: () => {
				// 캐시된 댓글 데이터를 다시 가져옵니다.
				queryClient.invalidateQueries(['comments', postData.id]);

				// 댓글 내용을 초기화합니다.
				setCommentContent('');

				// Toast 알림을 보여줍니다.
				setShowCommentToast(true);
				setTimeout(() => setShowCommentToast(false), 1000);
			},
		}
	);

	const handleCommentUpload = () => {
		commentMutation.mutate(commentContent);
	};

	const handleBackSpace = (e, author) => {
		e.preventDefault();
		author !== currentUserAccountName
			? navigate(-1)
			: navigate(`../../profile/${postData.author.accountname}`);
	};

	const handleModalOpen = (e) => {
		e.preventDefault();
		setIsModal(true);
	};

	const handleModalClose = (e) => {
		e.preventDefault();
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

	// 기존의 게시글을 불러오는 로직
	// useEffect(() => {
	// 	const fetchPost = async () => {
	// 		try {
	// 			const response = await getPostData(id);
	// 			setPostData(response.data.post);
	// 		} catch (error) {
	// 			console.error('데이터를 불러오지 못했습니다!', error);
	// 		}
	// 	};
	// 	fetchPost();
	// }, [id]);

	useEffect(() => {
		loadMyInfo();
	}, []);

	// 기존의 댓글 업로드 로직
	// const handleCommentUpload = async () => {
	// 	try {
	// 		await uploadComment(postData.id, commentContent);
	// 		setCommentContent('');
	// 		fetchComments();
	// 		setCommentCount(commentCount + 1);
	// 		setShowCommentToast(true);
	// 		setTimeout(() => setShowCommentToast(false), 1000);
	// 	} catch (error) {
	// 		console.error('댓글을 업로드하지 못했습니다!', error.response.data);
	// 	}
	// };

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const CommentToast = () => (
		<>
			{showCommentToast && (
				<ToastContainer>
					<ToastIcon>😺</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>댓글</ToastMsgBold>이 등록되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	return (
		<>
			<Helmet>
				<title>TravelUs | 게시글 상세</title>
			</Helmet>
			<WrapperViewPost>
				<NavbarWrap spaceBetween>
					<Backspace
						aria-label='뒤로가기'
						onClick={(e) => handleBackSpace(e, postData?.author?.accountname)}
					/>
					<OptionModalTab
						aria-label='더보기'
						onClick={handleModalOpen}
					></OptionModalTab>
				</NavbarWrap>

				{!isLoading && postData && (
					<PostDeleteContext.Provider
						value={{ deletedPostId, setDeletedPostId }}
					>
						<CommentCountProvider>
							<PostView>
								<Post postId={id} />
							</PostView>
						</CommentCountProvider>
					</PostDeleteContext.Provider>
				)}

				<CommentSection>
					{comments &&
						comments.map((comment) => (
							<Comment
								key={comment.id}
								comment={comment}
								postId={postData?.id}
								currentUsername={myAccountName}
							/>
						))}
				</CommentSection>

				<UploadComment>
					{postData && (
						<ProfileImageComment
							src={myProfilePic}
							onError={handleImgError}
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

				<CommentToast />
			</WrapperViewPost>
		</>
	);
};

export default ViewPost;
