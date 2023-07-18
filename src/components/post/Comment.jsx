import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { API_URL } from '../../api';

export const Comment = ({
	comment,
	token,
	postId,
	reloadComments,
	currentUsername,
}) => {
	const currentUserAccountName = localStorage.getItem('userAccountName');
	const { author, createdAt, content, id } = comment;
	const [isCommentModal, setIsCommentModal] = useState(false);
	const [showDeleteToast, setShowDeleteToast] = useState(false);
	const [showReportToast, setShowReportToast] = useState(false);
	const navigate = useNavigate();

	moment.locale('ko');
	const fromNow = moment(createdAt).fromNow();

	const handleCommentModalOpen = () => {
		setIsCommentModal(true);
	};

	const handleCommentModalClose = () => {
		setIsCommentModal(false);
	};

	const handleCommentDeleteClick = async () => {
		try {
			await axios.delete(`${API_URL}/post/${postId}/comments/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			setIsCommentModal(false);
			reloadComments();
			setShowDeleteToast(true);
			setTimeout(() => setShowDeleteToast(false), 1000);
		} catch (error) {
			console.error('오류 발생!');
		}
	};

	const handleReportClick = () => {
		setShowReportToast(true);
		setTimeout(() => setShowReportToast(false), 1000);
	};

	const handleImgError = (e) => {
		e.target.src = profilePic;
	};

	const DeleteToast = () => (
		<>
			{showDeleteToast && (
				<ToastContainer>
					<ToastIcon>🗑️</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>댓글</ToastMsgBold>이 삭제되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	const ReportToast = () => (
		<>
			{showReportToast && (
				<ToastContainer>
					<ToastIcon>🚨</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>댓글</ToastMsgBold>이 신고되었습니다.
					</ToastMsg>
				</ToastContainer>
			)}
		</>
	);

	return (
		<CommentWrapper>
			<FollowerProfileImageComment
				src={author.image}
				onError={handleImgError}
				onClick={() => {
					currentUserAccountName === author.accountname
						? navigate('../../profile/myprofile')
						: navigate(`../../profile/${author.accountname}`);
				}}
			></FollowerProfileImageComment>
			<CommentDetail>
				<CommentFollower>
					<CommentFollowerName
						onClick={() => {
							currentUserAccountName === author.accountname
								? navigate('../../profile/myprofile')
								: navigate(`../../profile/${author.accountname}`);
						}}
					>
						{author.username}
					</CommentFollowerName>
					<CommentTime>{fromNow}</CommentTime>
				</CommentFollower>

				<CommentText>{content}</CommentText>
			</CommentDetail>
			<OptionModalTabComment
				onClick={handleCommentModalOpen}
			></OptionModalTabComment>
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
		</CommentWrapper>
	);
};
