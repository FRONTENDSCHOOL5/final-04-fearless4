import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostDeleteContext } from '../../pages/post/PostDeleteContext';
import {
	Container,
	Card,
	RightCard,
	Top,
	UserDetails,
	ProfileImg,
	SpanName,
	SpanId,
	Dot,
	TextPost,
	ImgBx,
	Cover,
	Icons,
	IconsImg,
	IconsSpan,
	PostDate,
} from './post.style';
import heartIconInactive from '../../assets/icon/icon-heart.svg';
import heartIconActive from '../../assets/icon/icon-heart-active.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import dotIcon from '../../assets/icon/icon- more-vertical.svg';
import profilePic from '../../assets/image/profilePic.png';
import { Link } from 'react-router-dom';
import {
	DarkBackground,
	ModalWrap,
	ModalText,
	CheckModalWrap,
	CheckMsg,
	CheckButtonWrap,
	CheckConfirm,
} from '../../components/modal/modal.style';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';
import { useNavigate } from 'react-router-dom';
import {
	getPostData,
	deletePost,
	addHeartToPost,
	removeHeartFromPost,
} from '../../api/postAPI';

const formatCreatedAt = (createdAt) => {
	const date = new Date(createdAt);
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	return date.toLocaleDateString('ko-KR', options);
};

export function Post({ postId }) {
	const { setDeletedPostId } = useContext(PostDeleteContext);

	const currentUserAccountName = localStorage.getItem('userAccountName');
	const [isHearted, setIsHearted] = useState(false);
	const [isPostModal, setIsPostModal] = useState(false);
	const [isPostDeleteCheckModal, setIsPostDeleteCheckModal] = useState(false);
	const [isReportModal, setIsReportModal] = useState(false);
	const [showPostDeleteToast, setShowPostDeleteToast] = useState(false);
	const [showPostReportToast, setShowPostReportToast] = useState(false);
	const [showAPIErrorToast, setShowAPIErrorToast] = useState(false);
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const addHeartMutation = useMutation(addHeartToPost, {
		onSuccess: (data) => {
			queryClient.setQueryData(['post', postId], (oldData) => ({
				...oldData,
				heartCount: data?.post?.heartCount,
			}));
			setIsHearted(true);
			refetch();
		},
		onError: (error) => {
			setShowAPIErrorToast(true);
			setTimeout(() => {
				setShowAPIErrorToast(false);
			}, 1000);
		},
	});

	const removeHeartMutation = useMutation(removeHeartFromPost, {
		onSuccess: (data) => {
			queryClient.setQueryData(['post', postId], (oldData) => ({
				...oldData,
				heartCount: data?.post?.heartCount,
			}));
			setIsHearted(false);
			refetch();
		},
		onError: (error) => {
			setShowAPIErrorToast(true);
			setTimeout(() => {
				setShowAPIErrorToast(false);
			}, 1000);
		},
	});

	const deletePostMutation = useMutation(deletePost, {
		onSuccess: () => {
			setDeletedPostId(postData.id);
			setIsPostDeleteCheckModal(false);
			setShowPostDeleteToast(true);
			setTimeout(() => {
				setShowPostDeleteToast(false);
				navigate('/profile/');
			}, 1000);
		},
		onError: (error) => {
			setShowAPIErrorToast(true);
			setTimeout(() => {
				setShowAPIErrorToast(false);
			}, 1000);
		},
	});

	const fetchPostData = async () => {
		const response = await getPostData(postId);
		setIsHearted(response.data.post.hearted);
		return response.data.post;
	};

	const {
		data: postData,
		isLoading,
		refetch,
	} = useQuery(['post', postId], fetchPostData);

	const handleHeartClick = async () => {
		if (!isHearted) {
			addHeartMutation.mutate(postId);
		} else {
			removeHeartMutation.mutate(postId);
		}
	};

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const handlePostModalOptionClick = () => {
		postData.author.accountname === currentUserAccountName
			? setIsPostModal(true)
			: setIsReportModal(true);
	};
	const handlePostModalClose = () => {
		setIsPostModal(false);
	};
	const handlePostDeleteClick = () => {
		setIsPostDeleteCheckModal(true);
	};
	const handlePostEditClick = () => {
		if (postData) {
			navigate('/post/edit', {
				state: {
					id: postData.id,
					content: postData.content,
					image: postData.image,
				},
			});
		}
	};
	const handlePostDeleteCheckModalClose = () => {
		setIsPostDeleteCheckModal(false);
	};

	const handlePostDeleteConfirmClick = async () => {
		deletePostMutation.mutate(postId);
	};

	const handleReportClick = () => {
		setIsReportModal(false);
		setShowPostReportToast(true);
		setTimeout(() => {
			setShowPostReportToast(false);
		}, 1000);
	};

	const PostDeleteToast = () => (
		<>
			{showPostDeleteToast && (
				<ToastContainer>
					<ToastIcon>🗑️</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>게시글</ToastMsgBold>이 삭제되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	const PostReportToast = () => (
		<>
			{showPostReportToast && (
				<ToastContainer>
					<ToastIcon>🚨</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>게시글</ToastMsgBold>이 신고되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	return (
		<>
			{!isLoading && (
				<Container>
					<Card>
						<ProfileImg
							src={postData?.author?.image}
							alt={`${postData?.author?.username} 프로필 이미지입니다.`}
							className='profile_img'
							onError={handleImgError}
							onClick={() => {
								navigate(`../../profile/${postData?.author.accountname}`);
							}}
						/>
						<RightCard>
							<Top>
								<UserDetails
									onClick={() => {
										navigate(`../../profile/${postData?.author.accountname}`);
									}}
								>
									<SpanName className='span-name'>
										{postData?.author?.username}
									</SpanName>
									<SpanId className='span-id'>
										@{postData?.author?.accountname}
									</SpanId>
								</UserDetails>
								<Dot
									onClick={handlePostModalOptionClick}
									src={dotIcon}
									alt='Dot Icon'
								></Dot>
							</Top>

							<TextPost>{postData?.content}</TextPost>
							{postData?.image && postData?.image.trim() !== '' && (
								<ImgBx>
									<Cover src={postData?.image} alt='업로드한 이미지' />
								</ImgBx>
							)}

							<Icons>
								<IconsImg
									src={isHearted ? heartIconActive : heartIconInactive}
									alt='좋아요 버튼'
									onClick={handleHeartClick}
								/>
								<IconsSpan>{postData?.heartCount}</IconsSpan>
								<Link to={`/post/view/${postData?.id}`}>
									<IconsImg src={messageIcon} alt='댓글 버튼' />
								</Link>
								<IconsSpan>{postData?.commentCount}</IconsSpan>
							</Icons>
							<PostDate>{formatCreatedAt(postData?.createdAt)}</PostDate>
						</RightCard>
					</Card>
				</Container>
			)}
			{isPostModal && (
				<DarkBackground onClick={handlePostModalClose}>
					<ModalWrap>
						<ModalText onClick={handlePostDeleteClick}>삭제</ModalText>
						<ModalText onClick={handlePostEditClick}>수정</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
			{isPostDeleteCheckModal && (
				<DarkBackground onClick={handlePostDeleteCheckModalClose}>
					<CheckModalWrap>
						<CheckMsg>게시글을 삭제하시겠어요?</CheckMsg>
						<CheckButtonWrap>
							<CheckConfirm onClick={handlePostDeleteCheckModalClose}>
								취소
							</CheckConfirm>
							<CheckConfirm check onClick={handlePostDeleteConfirmClick}>
								삭제
							</CheckConfirm>
						</CheckButtonWrap>
					</CheckModalWrap>
				</DarkBackground>
			)}
			{isReportModal && (
				<DarkBackground onClick={() => setIsReportModal(false)}>
					<ModalWrap>
						<ModalText onClick={handleReportClick}>신고하기</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
			{showAPIErrorToast && (
				<ToastContainer>
					<ToastIcon>🚨</ToastIcon>
					<ToastMsg>존재하지 않는 게시글입니다.</ToastMsg>
				</ToastContainer>
			)}
			<PostDeleteToast />
			<PostReportToast />
		</>
	);
}
