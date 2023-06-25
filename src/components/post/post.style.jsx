import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../api';
import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	min-width: 358px;
	flex-grow: 1;
`;

export const Card = styled.div`
	position: relative;
	display: flex;
	min-width: 100%;
	height: 100%;
	padding: 20px 16px;
	justify-content: center;
	box-sizing: border-box;
`;

export const RightCard = styled.div`
	position: relative;
	margin-top: 4px;
	flex: 1;
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
`;

export const ProfileImg = styled.img`
	position: relative;
	min-width: 42px;
	height: 42px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 12px;
	display: block;
	object-fit: cover;
`;

export const SpanName = styled.span`
	font-family: 'Suit-Bold';
	font-size: 14px;
	color: #000;
	display: block;
`;

export const SpanId = styled.span`
	font-size: 12px;
	color: #767676;
	display: block;
	margin-top: 2px;
`;

export const Dot = styled.img`
	width: 18px;
	height: 18px;
	cursor: pointer;
`;

export const TextPost = styled.div`
	margin: 16px 0;
	font-size: 14px;
	min-width: 200px;
`;

export const ImgBx = styled.div`
	position: relative;
	width: 100%;
	height: auto;
	border-radius: 10px;
	overflow: hidden;
`;

export const Cover = styled.img`
	width: 100%;
	height: auto;
	object-fit: cover;
`;

export const Icons = styled.div`
	display: flex;
	margin-top: 12px;
	position: relative;
	align-items: center;
`;

export const IconsImg = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 6px;
	cursor: pointer;
`;

export const IconsSpan = styled.span`
	font-size: 12px;
	color: #767676;
	text-align: center;
	margin-right: 16px;
`;

export const PostDate = styled.div`
	margin-top: 16px;
	font-size: 10px;
	color: #767676;
`;

const formatCreatedAt = (createdAt) => {
	const date = new Date(createdAt);
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	return date.toLocaleDateString('ko-KR', options);
};

export function Post({ postId }) {
	const token = localStorage.getItem('token');
	const currentUserAccountName = localStorage.getItem('userAccountName');
	const [postData, setPostData] = useState(null);
	const [isHearted, setIsHearted] = useState(false);
	const [heartCount, setHeartCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isPostModal, setIsPostModal] = useState(false);
	const [isPostDeleteCheckModal, setIsPostDeleteCheckModal] = useState(false);
	const [isReportModal, setIsReportModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getpostData = async () => {
			try {
				await axios
					.get(`${API_URL}/post/${postId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					})
					.then((response) => {
						setIsLoading(true);
						setPostData(response.data.post);
						setIsHearted(response.data.post.hearted);
						setHeartCount(response.data.post.heartCount);
					});
			} catch (error) {
				console.error('데이터를 불러오지 못했습니다!', error);
			}
		};
		getpostData();
	}, [token, postId]);

	const handleHeartClick = async () => {
		try {
			if (!isHearted) {
				await axios
					.post(
						`${API_URL}/post/${postId}/heart`,
						{},
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-type': 'application/json',
							},
						}
					)
					.then((response) => {
						setIsHearted(true);
						setHeartCount(response.data.post.heartCount);
					});
			} else {
				await axios
					.delete(`${API_URL}/post/${postId}/unheart`, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					})
					.then((response) => {
						setIsHearted(false);
						setHeartCount(response.data.post.heartCount);
					});
			}
		} catch (error) {
			console.error('오류 발생!');
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
			navigate('/editPost', {
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
		try {
			await axios
				.delete(`${API_URL}/post/${postData.id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
				.then((response) => {
					console.log(response);
				});
		} catch (error) {
			console.error('오류 발생!');
		}
		setIsPostDeleteCheckModal(false);
	};
	const handleReportClick = () => {
		console.log('댓글이 신고되었습니다.');
		setIsReportModal(false);
	};

	return (
		<>
			{isLoading && (
				<Container>
					<Card>
						<ProfileImg
							src={postData.author.image}
							alt='Profile Image'
							className='profile_img'
							onError={handleImgError}
						/>
						<RightCard>
							<Top>
								<UserDetails>
									<SpanName className='span-name'>
										{postData.author.username}
									</SpanName>
									<SpanId className='span-id'>
										@{postData.author.accountname}
									</SpanId>
								</UserDetails>
								<Dot
									onClick={handlePostModalOptionClick}
									src={dotIcon}
									alt='Dot Icon'
								></Dot>
							</Top>
							<TextPost>{postData.content}</TextPost>
							{postData.image && (
								<ImgBx>
									<Cover src={postData.image} alt='업로드한 이미지' />
								</ImgBx>
							)}
							<Icons>
								<IconsImg
									src={isHearted ? heartIconActive : heartIconInactive}
									alt='Heart Icon'
									onClick={handleHeartClick}
								/>
								<IconsSpan>{heartCount}</IconsSpan>
								<Link to={`/viewPost/${postData.id}`}>
									<IconsImg src={messageIcon} alt='Message Icon' />
								</Link>
								<IconsSpan>{postData.commentCount}</IconsSpan>
							</Icons>
							<PostDate>{formatCreatedAt(postData.createdAt)}</PostDate>
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
		</>
	);
}
