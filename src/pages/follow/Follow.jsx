import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Backspace,
	NavbarTitle,
	NavbarWrap,
} from '../../components/navbar/navbar.style';
import {
	LoadingText,
	ScrollRef,
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
import { useInView } from 'react-intersection-observer';

export default function Follwers() {
	const [follower, setFollower] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const accountname = useParams().accountUsername;
	const follow = useParams().follow;
	const token = localStorage.getItem('token');
	const myAccountName = localStorage.getItem('userAccountName');
	const url = API_URL;
	const [ref, inView] = useInView();
	const [skip, setSkip] = useState(0);
	const [hasNextPage, setHasNextPage] = useState(true);

	const followerData = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: `${url}/profile/${accountname}/${follow}/?limit=10&skip=${skip}`,
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
			updateFollowing.length >= 10
				? setHasNextPage(true)
				: setHasNextPage(false);
			setFollower([...follower, ...updateFollowing]);
			setSkip((prev) => prev + 10);
		} catch (error) {
			console.log('에러입니다', error);
		}
	};

	useEffect(() => {
		inView && followerData();
	}, [inView, isLoading]);

	const handleFollowChange = async (index, accountname, e) => {
		e.preventDefault();
		const updateFollowing = [...follower];
		updateFollowing[index].isFollow = !follower[index].isFollow;
		setFollower(updateFollowing);
		try {
			const res = await axios({
				method: !follower[index].isFollow ? 'DELETE' : 'POST',
				url: `${url}/profile/${accountname}/${
					!follower[index].isFollow ? 'unfollow' : 'follow'
				}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			console.log(res);
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
				{isLoading && follower.length !== 0
					? follower.map((item, index) => {
							return follower.length - 1 !== index ? (
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
							) : (
								<>
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
								</>
							);
					  })
					: isLoading &&
					  (!follower || follower.length === 0) && <FollowUnknown />}
				{!isLoading && <Loading />}
				{hasNextPage && (
					<>
						{/* {<LoadingText>Loading...</LoadingText>} */}

						<ScrollRef ref={ref}></ScrollRef>
					</>
				)}
			</Wrapper>
		</>
	);
}
