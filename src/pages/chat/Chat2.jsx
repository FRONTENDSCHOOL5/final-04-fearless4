import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
	ModalWrap,
	ModalText,
	DarkBackground,
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
} from '../post/viewPost.style';

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
	HomeContainer,
	ChatImg,
	ChatUser,
	ChatTitle,
} from './chat.style';

import UploadPic from '../../assets/image/profileImageUploadButton.png';
import Alpaca from '../../assets/image/alpaca.png';
import ChatProfile from '../../assets/image/chatProfile2.jpg';
import { Helmet } from 'react-helmet';

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

	return (
		<>
			<>
				<Helmet>
					<title>TravelUs | 채팅</title>
				</Helmet>
				<NavbarWrap spaceBetween>
					<Backspace
						aria-label='뒤로가기'
						onClick={() => {
							navigate(-1);
						}}
					/>
					<ChatUser>여행조아 </ChatUser>
					<OptionModalTab aria-label='더보기' onClick={handleModalOpen} />
				</NavbarWrap>
				<HomeContainer>
					<ChatTitle>여행조아 채팅방</ChatTitle>

					<ChatBox>
						<Column>
							<MessageRow>
								<ProfileImg
									src={ChatProfile}
									alt='여행조아 프로필 이미지입니다'
								/>
								<MessageText>
									<ChatText>
										안녕하세요~ 올려주신 상품을 보다가 궁금한 점이 있어서 메시지
										남깁니다. 이번에 저희 아이들이랑 알파카 월드에 가려고
										하는데요, 여기에는 입장권만 파는 것 같아서요, 혹시 알파카와
										힐링산책 상품도 추가 구매할 수 있는지 궁금합니다!
									</ChatText>
								</MessageText>
								<Time>4:30</Time>
							</MessageRow>
						</Column>
						<Column>
							<MessageRow>
								<ProfileImg
									src={ChatProfile}
									alt='여행조아 프로필 이미지입니다'
								/>
								<MessageText>
									<ChatText>
										그리고 해당 상품 가격도 안내부탁드리겠습니다.
									</ChatText>
								</MessageText>
								<Time>4:30</Time>
							</MessageRow>
						</Column>
						<Column>
							<MessageRow2>
								<Time>4:31</Time>
								<MessageText2>
									<ChatTextRight>
										안녕하세요, 고객님. 아쉽게도 알파카와 힐링산책 상품은 직접
										현장에서만 구매가능하십니다. 현장 구매시 12,000원입니다.
										또한, 현장에서도 상황에 따라 해당 상품 이용이 어려우실 수
										있습니다. 불편드려서 죄송합니다. 추가 문의사항 있으시면
										언제든지 편히 문의 부탁드리겠습니다. 감사합니다.
									</ChatTextRight>
								</MessageText2>
							</MessageRow2>
						</Column>
						<Column>
							<MessageRow2>
								<Time>4:31</Time>

								<ChatTextRight>
									<ChatImg src={Alpaca} alt='알파카 이미지' />
								</ChatTextRight>
							</MessageRow2>
						</Column>
					</ChatBox>
				</HomeContainer>

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
				<>
					<UploadComment>
						{
							<ProfileImageComment
								alt='이미지 추가버튼'
								src={UploadPic}
							></ProfileImageComment>
						}
						<CommentInputArea
							placeholder='메세지 입력하기...'
							rows={1}
							value={text}
							onChange={(e) => setText(e.target.value)}
						></CommentInputArea>
						<CommentUploadButton
							style={{ color: text ? '#81d8d0' : '#c4c4c4' }}
						>
							전송
						</CommentUploadButton>
					</UploadComment>
				</>
			</>
		</>
	);
}
