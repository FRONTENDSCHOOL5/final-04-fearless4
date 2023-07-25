import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { FollowButton, MoreButton } from '../../components/button/button.style';
import axios from 'axios';
import userNoneProfile from '../../assets/image/profilePic.png';
import { API_URL } from '../../api';
import FollowUnknown from './FollowUnknown';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';

export default function Follwers() {
	const [view, setView] = useState(1);
	const [follower, setFollower] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const accountname = useParams().accountUsername;
	const follow = useParams().follow;
	const token = localStorage.getItem('token');
	const myAccountName = localStorage.getItem('userAccountName');
	const url = API_URL;

	const followerData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/${accountname}/${follow}/?limit=infinity`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setIsLoading(true);
			const updateFollowing = res.data.map((item) => ({
				...item,
				isFollow: item.isfollow,
			}));
			setFollower(updateFollowing);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		followerData();
	}, []);

	const followResult = follower?.slice(0, view * 6);

	const handleClickMore = () => {
		setView(view + 1);
	};

	const handleFollowChange = async (index, accountname, e) => {
		e.preventDefault();
		const updateFollowing = [...follower];
		updateFollowing[index].isFollow = !follower[index].isFollow;
		setFollower(updateFollowing);
		try {
			const res = await axios({
				method: follower[index].isFollow ? 'DELETE' : 'POST',
				url: `${url}/profile/${accountname}/${
					follower[index].isFollow ? 'unfollow' : 'follow'
				}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	const handleImgError = (e) => {
		e.target.src = userNoneProfile;
	};

	return (
		<>
			<Helmet>
				<title>{`TravelUs | ${
					follow === 'follower' ? '팔로워' : '팔로잉'
				}`}</title>
			</Helmet>
			<NavbarWrap>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<NavbarTitle>{`${
					follow === 'follower' ? 'Followers' : 'Followings'
				}`}</NavbarTitle>
			</NavbarWrap>
			<Wrapper>
				{isLoading && followResult.length !== 0
					? followResult.map((item, index) => {
							return (
								<UserWrap key={item._id}>
									<UserFlexWrap>
										<UserProfileImg
											onClick={() => {
												navigate(`../../${item.accountname}`);
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
												navigate(`../../${item.accountname}`);
											}}
										>
											<UserFollowNickName>{item.username}</UserFollowNickName>
											<UserFollowIntro>{item.intro}</UserFollowIntro>
										</UserContent>
									</UserFlexWrap>
									{!(myAccountName === item.accountname) && (
										<FollowButton
											type='button'
											follow={item.isFollow}
											onClick={(e) => {
												handleFollowChange(index, item.accountname, e);
											}}
										>
											{item.isFollow === true ? '취소' : '팔로우'}
										</FollowButton>
									)}
								</UserWrap>
							);
					  })
					: isLoading &&
					  myAccountName &&
					  (!follower || follower.length === 0) && <FollowUnknown />}
				{!isLoading && <Loading />}
				{followResult?.length % (view * 6) < 6 && follower?.length > 6 && (
					<MoreButton type='button' onClick={handleClickMore}>
						더보기
					</MoreButton>
				)}
			</Wrapper>
		</>
	);
}
