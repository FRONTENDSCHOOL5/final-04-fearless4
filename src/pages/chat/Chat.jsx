import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import {
	UploadComment,
	CommentInputArea,
	CommentUploadButton,
	ProfileImageComment,
} from './../post/viewPost.style';

import {
	ChatBox,
	MessageRow,
	MessageRow2,
	ProfileImg,
	MessageText,
	Column,
	MessageText2,
	ChatText,
	ChatTextRight,
	Time,
} from './chat.style';
import ProfilePic from '../../assets/image/profilePic.png';
import UploadPic from '../../assets/image/profileImageUploadButton.png';

import styled from 'styled-components';

export default function Chat() {
	const navigate = useNavigate();
	const [text, setText] = useState('');
	const [isModal, setIsModal] = useState(false);
	const [isCheckModal, setIsCheckModal] = useState(false);

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

	const HomeContainer = styled.div`
		position: relative;
		width: 100%;
		height: 90vh;
		display: flex;
		flex-direction: column;
		padding-top: 20px;
		background-color: #f2f2f2;
	`;

	return (
		<div>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				애월읍 위니브 감귤농장 <OptionModalTab onClick={handleModalOpen} />
			</NavbarWrap>
			<HomeContainer>
				<ChatBox>
					<Column>
						<MessageRow>
							<ProfileImg src={ProfilePic} />
							<MessageText>
								<ChatText>
									옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
									뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고,
									못할 넣는 풍부하게 뛰노는 인생의 힘있다.
								</ChatText>
							</MessageText>
							<Time>4:30</Time>
						</MessageRow>
					</Column>
					<Column>
						<MessageRow>
							<ProfileImg src={ProfilePic} />
							<MessageText>
								<ChatText>안녕하세요. 감귤 사고싶어요요요요요</ChatText>
							</MessageText>
							<Time>4:30</Time>
						</MessageRow>
					</Column>
					<Column>
						<MessageRow2>
							<Time>4:30</Time>
							<MessageText2>
								<ChatTextRight>네 말씀하세요.</ChatTextRight>
							</MessageText2>
						</MessageRow2>
					</Column>
				</ChatBox>
			</HomeContainer>
			<UploadComment>
				{<ProfileImageComment src={UploadPic}></ProfileImageComment>}
				<CommentInputArea
					placeholder='메세지 입력하기...'
					rows={1}
					value={text}
					onChange={(e) => setText(e.target.value)}
				></CommentInputArea>
				<CommentUploadButton style={{ color: text ? '#81d8d0' : '#c4c4c4' }}>
					전송
				</CommentUploadButton>
			</UploadComment>
			{isModal && (
				<DarkBackground onClick={handleModalClose}>
					<ModalWrap>
						<ModalText
							onClick={() => {
								navigate(-1);
							}}
						>
							채팅방 나가기
						</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
		</div>
	);
}
