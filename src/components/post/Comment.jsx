import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/ko';
import {
	CommentWrapper,
	FollowerProfileImageComment,
	CommentDetail,
	CommentFollower,
	CommentFollowerName,
	CommentTime,
	CommentText,
	OptionModalTabComment,
} from '../../pages/post/viewPost.style';
import { ModalWrap, ModalText, DarkBackground } from '../modal/modal.style';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../toast/toast.style';
import profilePic from '../../assets/image/profilePic.png';
import { deleteComment, reportComment } from '../../api/commentAPI';
import { useCommentCount } from '../../pages/post/CommentCounterContext';

export const Comment = ({ comment, postId, currentUsername }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const currentUserAccountName = localStorage.getItem('userAccountName');
	const { author, createdAt, content, id } = comment;
	const { commentCount, setCommentCount } = useCommentCount();

	const [isCommentModal, setIsCommentModal] = useState(false);
	const [showDeleteToast, setShowDeleteToast] = useState(false);
	const [showReportToast, setShowReportToast] = useState(false);

	const navigateToProfile = (accountName) => {
		if (currentUserAccountName === accountName) {
			navigate('../../profile');
		} else {
			navigate(`../../profile/${accountName}`);
		}
	};

	moment.locale('ko');
	const fromNow = moment(createdAt).fromNow();

	const handleCommentModalOpen = () => setIsCommentModal(true);
	const handleCommentModalClose = () => setIsCommentModal(false);

	const deleteMutation = useMutation(deleteComment, {
		onSuccess: async () => {
			queryClient.invalidateQueries('comments');
			setShowDeleteToast(true);
			setTimeout(() => setShowDeleteToast(false), 1000);
			setCommentCount(commentCount - 1);
		},
	});

	const reportMutation = useMutation(reportComment, {
		onSuccess: () => {
			setShowReportToast(true);
			setTimeout(() => setShowReportToast(false), 1000);
		},
	});

	const handleCommentDeleteClick = () => {
		deleteMutation.mutate({ postId, commentId: id });
		setIsCommentModal(false);
	};

	const handleReportClick = () => {
		reportMutation.mutate({ id });
	};

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const DeleteToast = () =>
		showDeleteToast && (
			<ToastContainer>
				<ToastIcon>🗑️</ToastIcon>
				<ToastMsg>
					<ToastMsgBold>댓글</ToastMsgBold>이 삭제되었습니다.
				</ToastMsg>
			</ToastContainer>
		);

	const ReportToast = () =>
		showReportToast && (
			<ToastContainer>
				<ToastIcon>🚨</ToastIcon>
				<ToastMsg>
					<ToastMsgBold>댓글</ToastMsgBold>이 신고되었습니다.
				</ToastMsg>
			</ToastContainer>
		);

	return (
		<CommentWrapper>
			<FollowerProfileImageComment
				src={author.image}
				onError={handleImgError}
				onClick={() => navigateToProfile(author.accountName)}
				aria-label='user profile'
			/>
			<CommentDetail>
				<CommentFollower>
					<CommentFollowerName
						onClick={() => navigateToProfile(author.accountName)}
					>
						{author.username}
					</CommentFollowerName>
					<CommentTime>{fromNow}</CommentTime>
				</CommentFollower>
				<CommentText>{content}</CommentText>
			</CommentDetail>
			<OptionModalTabComment
				onClick={handleCommentModalOpen}
				aria-label='comment option'
			/>
			{isCommentModal && (
				<DarkBackground onClick={handleCommentModalClose}>
					<ModalWrap>
						{author.accountname === currentUsername ? (
							<ModalText onClick={handleCommentDeleteClick}>삭제</ModalText>
						) : (
							<ModalText onClick={handleReportClick}>신고</ModalText>
						)}
					</ModalWrap>
				</DarkBackground>
			)}
			<DeleteToast />
			<ReportToast />
			{deleteMutation.isError && <div>Error deleting comment</div>}
			{reportMutation.isError && <div>Error reporting comment</div>}
		</CommentWrapper>
	);
};
