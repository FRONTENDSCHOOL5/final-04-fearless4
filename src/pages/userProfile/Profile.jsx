import React, { useState } from 'react';
import { PostDeleteContext } from '../post/PostDeleteContext.jsx';
import { ProfilePageWrapper, ProfileTitle } from './Profile.style.jsx';
import { ProfileCard } from './ProfileCard.jsx';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style.jsx';
import {
	ModalWrap,
	ModalText,
	DarkBackground,
	CheckModalWrap,
	CheckMsg,
	CheckButtonWrap,
	CheckLogout,
} from '../../components/modal/modal.style.jsx';
import PostList from '../../components/post/PostList.jsx';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style.jsx';
import ProductsForSale from './ProductsForSale.jsx';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import Page404 from '../page404/Page404.jsx';
import { useQuery } from '@tanstack/react-query';
import { postAccountValid } from '../../api/profileApi.js';
export default function UserProfile() {
	const [isModal, setIsModal] = useState(false);
	const [isCheckModal, setIsCheckModal] = useState(false);
	const [deletedPostId, setDeletedPostId] = useState(null);
	const myaccountname = localStorage.getItem('userAccountName');
	const accountname = useParams().accountUsername;
	const navigate = useNavigate();

	const { data: isUser, isLoading } = useQuery(
		['isUserData', accountname],
		() =>
			accountname
				? postAccountValid(accountname)
				: postAccountValid(myaccountname)
	);

	const handleModalOpen = (e) => {
		e.preventDefault();
		setIsModal(true);
	};

	const handleModalClose = (e) => {
		e.preventDefault();
		// e.currentTarget 현재 handleModalClose가 부착된 요소
		// e.target 내가 클릭한 자식 요소
		console.log(e.target, e.currentTarget);
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

	return (
		<>
			<Helmet>
				<title>TravelUs | 프로필</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<OptionModalTab onClick={handleModalOpen} />
			</NavbarWrap>
			{!isLoading && isUser === '이미 가입된 계정ID 입니다.' ? (
				<>
					<ProfilePageWrapper>
						<ProfileTitle>
							{(!accountname ? myaccountname : accountname) + '의 프로필'}
						</ProfileTitle>
						<ProfileCard />
						<ProductsForSale
							userAccountName={!accountname ? myaccountname : accountname}
						/>
						<PostDeleteContext.Provider
							value={{ deletedPostId, setDeletedPostId }}
						>
							{' '}
							<PostList
								accountname={!accountname ? myaccountname : accountname}
							></PostList>
						</PostDeleteContext.Provider>
					</ProfilePageWrapper>
				</>
			) : (
				!isLoading &&
				isUser !== '이미 가입된 계정ID 입니다.' && (
					<Page404 message='User not Found' />
				)
			)}

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
			<BottomNavContainer profile />
		</>
	);
}
