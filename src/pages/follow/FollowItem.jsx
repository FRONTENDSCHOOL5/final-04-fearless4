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
			<UserFlexWrap
				aria-label={`${follow.username} 프로필 이미지입니다. 클릭 시 해당 유저 프로필로 이동할 수 있습니다.`}
				to={
					myAccountName === follow.accountname
						? '../../../profile'
						: `../../${follow.accountname}`
				}
			>
				<UserProfileImg>
					<UserFollowImage
						src={follow.image}
						onError={handleImgError}
						alt={`${follow.username} 프로필 이미지입니다.`}
					/>
				</UserProfileImg>
				<UserContent>
					<UserFollowNickName>{follow.username}</UserFollowNickName>
					<UserFollowIntro>{follow.intro}</UserFollowIntro>
				</UserContent>
			</UserFlexWrap>
			{!(myAccountName === follow.accountname) && (
				<FollowButton
					aria-label={
						followButtonState
							? `${follow.username}를 팔로우 취소하는 버튼입니다`
							: `${follow.username}를 팔로우하는 버튼입니다.`
					}
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
