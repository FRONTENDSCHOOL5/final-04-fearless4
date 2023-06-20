import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import {
	UserContent,
	UserFlexWrap,
	UserFollowImage,
	UserFollowIntro,
	UserFollowNickName,
	UserProfileImg,
	UserWrap,
	Wrapper,
} from './follow.style';
import { FollowButton } from '../../components/button/button.style';
import axios from 'axios';
import userNoneProfile from '../../assets/image/profilePic.png';
import { API_URL } from '../../api';
import useMyProfile from '../../hook/useMyProfile';

export default function Follwers() {
	const [follower, setFollower] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFollow, setIsFollow] = useState();
	const [myAccountName, setMyAccountName] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const accountname = location.state.accountname;
	const token = localStorage.getItem('token');
	const url = API_URL;
	const data = useMyProfile();

	const followerData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/${accountname}/following/?limit=infinity`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setIsLoading(true);
			setFollower(res.data);
			// console.log(res.data);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		followerData();
		data && setMyAccountName(data.accountname);
		console.log(myAccountName);
	}, [data]);

	useEffect(() => {}, [isFollow]);

	const handleFollowChange = async (isfollow, accountname, e) => {
		e.preventDefault();
		if (isfollow === false) {
			try {
				const res = await axios({
					method: 'POST',
					url: `${url}/profile/${accountname}/follow`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				// console.log(res.data.profile);
				setIsFollow(res.data.profile);
				// console.log(isfollow);
			} catch (error) {
				console.log('에러입니다', error);
			}
		} else {
			try {
				const res = await axios({
					method: 'DELETE',
					url: `${url}/profile/${accountname}/unfollow`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				setIsFollow(res.data.profile);
				// console.log(res);
				// console.log(isfollow);
			} catch (error) {
				console.log('에러입니다', error);
			}
		}
	};

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<Wrapper>
			<NavbarWrap>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<NavbarTitle>Followings</NavbarTitle>
			</NavbarWrap>
			{isLoading &&
				myAccountName &&
				follower.map((item) => {
					return (
						<UserWrap key={item._id}>
							<UserFlexWrap>
								<UserProfileImg
									onClick={() => {
										console.log(myAccountName);
										myAccountName === item.accountname
											? navigate('/myprofile')
											: navigate('/userprofile', {
													state: { accountname: item.accountname },
											  });
									}}
								>
									<UserFollowImage
										src={item.image}
										onError={handleImgError}
										alt='유저 프로필 이미지입니다.'
									/>
								</UserProfileImg>
								<UserContent
									onClick={() => {
										myAccountName === item.accountname
											? navigate('/myprofile')
											: navigate('/userprofile', {
													state: { accountname: item.accountname },
											  });
									}}
								>
									<UserFollowNickName>{item.username}</UserFollowNickName>
									<UserFollowIntro>{item.intro}</UserFollowIntro>
								</UserContent>
							</UserFlexWrap>
							{!(myAccountName === item.accountname) && (
								<FollowButton
									follow={item.isfollow}
									onClick={(e) => {
										handleFollowChange(item.isfollow, item.accountname, e);
									}}
								>
									{item.isfollow === true ? '취소' : '팔로우'}
								</FollowButton>
							)}
						</UserWrap>
					);
				})}
		</Wrapper>
	);
}
