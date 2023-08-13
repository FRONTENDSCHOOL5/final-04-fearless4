import React, { useState } from 'react';
import { FollowButton } from '../../components/button/button.style';
import {
	UserContent,
	UserFlexWrap,
	UserFollowImage,
	UserFollowIntro,
	UserFollowNickName,
	UserProfileImg,
	UserWrap,
} from './follow.style';
import userNoneProfile from '../../assets/image/profilePic.png';
import { useNavigate } from 'react-router-dom';
import { delUnFollow, postFollow } from '../../api/followApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function FollowItem({ follow }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const myAccountName = localStorage.getItem('userAccountName');
	const [followButtonState, setFollowButtonState] = useState(follow.isfollow);

	const delFollowMutaion = useMutation(delUnFollow, {
		onSuccess: () => {
			// queryClient.invalidateQueries('profileData');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const postFollowMutaion = useMutation(postFollow, {
		onSuccess: () => {
			// queryClient.invalidateQueries('profileData');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const handleFollowButtonClick = async (accountname, e) => {
		e.preventDefault();

		if (followButtonState) {
			delFollowMutaion.mutate(accountname);
		} else {
			postFollowMutaion.mutate(accountname);
		}

		setFollowButtonState(!followButtonState);
	};

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<UserWrap key={follow._id}>
			<UserFlexWrap>
				<UserProfileImg
					onClick={() => {
						myAccountName === follow.accountname
							? navigate('../../../profile')
							: navigate(`../../${follow.accountname}`);
					}}
				>
					<UserFollowImage
						src={follow.image}
						onError={handleImgError}
						alt={`${follow.username} 프로필 이미지입니다.`}
					/>
				</UserProfileImg>
				<UserContent
					onClick={() => {
						myAccountName === follow.accountname
							? navigate('../../../profile')
							: navigate(`../../${follow.accountname}`);
					}}
				>
					<UserFollowNickName>{follow.username}</UserFollowNickName>
					<UserFollowIntro>{follow.intro}</UserFollowIntro>
				</UserContent>
			</UserFlexWrap>
			{!(myAccountName === follow.accountname) && (
				<FollowButton
					type='button'
					follow={followButtonState}
					onClick={(e) => handleFollowButtonClick(follow.accountname, e)}
				>
					{followButtonState ? '취소' : '팔로우'}
				</FollowButton>
			)}
		</UserWrap>
	);
}

export default FollowItem;
