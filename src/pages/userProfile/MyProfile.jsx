import React from 'react';
import { ChatShare, ProfileButton } from '../../components/button/button.style';
import {
	ProfileWrapper,
	Intro,
	UserEmail,
	UserNickName,
	Follower,
	FollowerNumber,
	FollowerWrap,
	ProfileImgWrap,
	UserWrap,
	ProfileButtonWrap,
} from './userProfile.style';
import { ProfileImage } from '../profileSetup/profileSetup.style';
import profilePic from '../../assets/image/profilePic.png';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import { ModalText, ModalWrap } from '../../components/modal/modal.style';
export default function UserProfile() {
	return (
		<>
			<ProfileWrapper>
				<NavbarWrap profile>
					<Backspace />
					<OptionModalTab />
				</NavbarWrap>
				<ProfileImgWrap>
					<FollowerWrap>
						<FollowerNumber followers>2950</FollowerNumber>
						<Follower>followers</Follower>
					</FollowerWrap>

					<ProfileImage
						style={{ width: '110px', height: '110px' }}
						src={profilePic}
						alt=''
					></ProfileImage>

					<FollowerWrap>
						<FollowerNumber>128</FollowerNumber>
						<Follower>followings</Follower>
					</FollowerWrap>
				</ProfileImgWrap>

				<UserWrap>
					<UserNickName>애월읍 위니브 감귤 농장</UserNickName>
					<UserEmail>@ weniv_Mandarin</UserEmail>
					<Intro>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</Intro>
				</UserWrap>

				<ProfileButtonWrap>
					{/* <ProfileButton follow type='button'>
						팔로우
					</ProfileButton> */}
					<ProfileButton type='button'>프로필 수정</ProfileButton>
					<ProfileButton product type='button'>
						상품 등록
					</ProfileButton>
				</ProfileButtonWrap>
				<ModalWrap>
					<ModalText>설정 및 개인정보</ModalText>
					<ModalText>로그아웃</ModalText>
				</ModalWrap>
			</ProfileWrapper>
		</>
	);
}
