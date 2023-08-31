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
	ChatImg,
	HomeContainer,
	ChatUser,
	ChatTitle,
} from './chat.style';
import UploadPic from '../../assets/image/profileImageUploadButton.png';
import VillageInItaly2 from '../../assets/image/villageInItaly2.jpg';
import ChatProfile from '../../assets/image/chatProfile.jpg';
import { Helmet } from 'react-helmet-async';

export default function Chat2() {
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
				<ChatUser>choi </ChatUser>
				<OptionModalTab aria-label='더보기' onClick={handleModalOpen} />
			</NavbarWrap>
			<HomeContainer>
				<ChatTitle>choi 채팅방</ChatTitle>

				<ChatBox>
					<Column>
						<MessageRow>
							<ProfileImg src={ChatProfile} alt='choi 프로필 이미지입니다' />
							<MessageText>
								<ChatText>
									안녕하세요! 판매중이신 상품들 중에 친구들과 가기 좋은 곳이
									어디있을까요? 친구들이랑 좋은 추억을 남기고 싶습니다.
								</ChatText>
							</MessageText>
							<Time>3:20</Time>
						</MessageRow>
					</Column>
					<Column>
						<MessageRow>
							<ProfileImg src={ChatProfile} alt='choi 프로필 이미지입니다' />
							<MessageText>
								<ChatText>
									저희는 여행가서 이쁜 곳에서 사진 많이 찍고 싶어요~
								</ChatText>
							</MessageText>
							<Time>3:20</Time>
						</MessageRow>
					</Column>
					<Column>
						<MessageRow2>
							<Time>3:23</Time>
							<MessageText2>
								<ChatTextRight>
									안녕하세요, 고객님! 혹시 이탈리아마을 어떠실까요? 가평에 있는
									이탈리아 마을은 여권없이 떠나는 국내 유일의 이탈리아
									테마파크입니다! 사진찍을 곳도 많고, 공연도 있어서 충분히 좋은
									추억쌓으실 수 있습니다. 이외 추가 문의 있으시면 언제든지
									문의주세요! 아래 사진은 이탈리아 마을에서 오시면 보실 수 있는
									곳입니다~
								</ChatTextRight>
							</MessageText2>
						</MessageRow2>
					</Column>

					<Column>
						<MessageRow2>
							<Time>3:24</Time>
							<ChatTextRight>
								<ChatImg src={VillageInItaly2} alt='이탈리아마을 이미지' />
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
				<CommentUploadButton style={{ color: text ? '#81d8d0' : '#c4c4c4' }}>
					전송
				</CommentUploadButton>
			</UploadComment>
		</>
	);
}
